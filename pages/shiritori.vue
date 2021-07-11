<template>
  <v-app light>
    <v-container>
      <h1> しりとり </h1>
    </v-container>
    <v-container>
      <v-btn v-if="isStarted===false" @click.stop="startShiritori()">
        スタート
      </v-btn>
      <v-btn v-if="isStarted===true" @click.stop="endShiritori()">
        ギブアップ
      </v-btn>
    </v-container>
    <v-container v-if="isError===true">
      <v-alert color="#FFEB3B">{{ errorText }}</v-alert>
    </v-container>
    <v-container class="main">
      <v-row>
        <v-col>
          {{turnCount}} ターン目
        </v-col>
        <v-col>
          タイマー：残り{{timerCount}}秒
        </v-col>
        <v-spacer />
      </v-row>
      <v-row v-if="isStarted===true" align="center" class="second">
        <v-col class="textfield">
          <v-text-field v-if="isGameover===false" v-model="inputText" label="言葉を入力" @keyup.enter="send()" />
          <v-text-field v-if="isGameover===true" v-model="inputText" disabled label="言葉を入力" />
        </v-col>
        <v-btn v-if="isGameover===false" @click.stop="send()">
          送信
        </v-btn>
        <v-btn v-if="isGameover===true" disabled @click.stop="send()">
          送信
        </v-btn>
      </v-row>
      <v-row v-if="isLoading===true">
        <v-col>
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-col>
      </v-row>
      <v-row v-for="(word, index) in words" :key="index">
        <v-col v-if="word.isEnemy==true" class="enemy">
          {{ word.word }}
          （{{ word.furigana }}）
        </v-col>
        <v-col v-else class="player">
          {{ word.word }}
          （{{ word.furigana }}）
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Axios from 'axios'

@Component
export default class Shiritori extends Vue {
  public isError: boolean = false
  public errorText: string = ''

  public inputText: string = ''
  public isStarted: boolean = false
  public isLoading: boolean = false
  public isGameover: boolean = false
  public turnCount: number = 0
  public timelimit: number = 30
  public timerCount: number = 30
  public timer!: any

  public words: any[] = []

  public async startShiritori () {
    const res = await Axios.get('/api/shiritori/start')
      .then((result: any) => {
        return result.data
      })
      .catch((_err) => {
        this.isError = true
      })
    const word = {
      id: res.id,
      word: res.word,
      furigana: res.furigana,
      first_char: res.first_char,
      last_char: res.last_char,
      isEnemy: true
    }
    this.words.push(word)
    this.timerCount = this.timelimit
    this.timer = setInterval(this.countdown, 1000)
    this.isStarted = true
    this.turnCount += 1
  }

  public async send () {
    clearInterval(this.timer)
    this.isLoading = true
    if (this.inputText === '') {
      this.isError = true
      this.errorText = '正しい言葉を入力してください'
      this.inputText = ''
      this.isLoading = false
      this.timer = setInterval(this.countdown, 1000)
      return
    }
    // ひらがな、カタカナ、漢字の判定
    const japaneseRegex = /^[\u30A0-\u30FF\u3040-\u309F\u3005-\u3006\u30E0-\u9FCF]+$/
    if (this.inputText.match(japaneseRegex) === null) {
      this.isError = true
      this.errorText = 'ひらがな、カタカナ、漢字を入力してください'
      this.inputText = ''
      this.isLoading = false
      this.timer = setInterval(this.countdown, 1000)
      return
    }
    this.isError = false
    const res = await Axios.get('/api/shiritori/next?text=' + this.inputText)
      .then((result: any) => {
        return result.data
      })
      .catch((_err) => {
        this.isError = true
      })
    if (res.code === true) {
      if (this.words[0].last_char !== res.input.information.first_char) {
        this.isError = true
        this.errorText = 'ルール違反です（文字の不一致）'
        this.isLoading = false
        this.timer = setInterval(this.countdown, 1000)
        return
      }
      const playerWord = {
        id: res.input.information.id,
        word: res.input.word,
        furigana: res.input.information.furigana,
        first_char: res.input.information.first_char,
        last_char: res.input.information.last_char,
        isEnemy: false
      }
      this.words.unshift(playerWord)
      const enemyWord = {
        id: res.next.id,
        word: res.next.word,
        furigana: res.next.furigana,
        first_char: res.next.first_char,
        last_char: res.next.last_char,
        isEnemy: true
      }
      this.words.unshift(enemyWord)
      this.inputText = ''
      this.isLoading = false
      this.turnCount += 1
      this.timerCount = this.timelimit // 次のターンに進んだときのみタイマーをリセットする
      this.timer = setInterval(this.countdown, 1000)
    } else {
      this.isError = true
      this.errorText = res.input.information.error
      this.isLoading = false
      this.timer = setInterval(this.countdown, 1000)
    }
  }

  public endShiritori () {
    this.isStarted = false
    this.isGameover = false
    this.words = []
    this.turnCount = 0
    this.isError = false
    this.errorText = ''
    clearInterval(this.timer)
    this.timerCount = 30
  }

  public countdown () {
    this.timerCount = this.timerCount - 1
    if (this.timerCount === 0) {
      this.gameover()
    }
  }

  public gameover () {
    clearInterval(this.timer)
    this.isError = true
    this.isGameover = true
    this.errorText = '時間切れです'
  }
}
</script>

<style scoped>
  .enemy {
    background-color: #FFCDD2;
  }
  .player {
    background-color: #BBDEFB;
  }
</style>

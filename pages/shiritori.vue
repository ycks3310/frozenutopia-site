<template>
  <v-app light>
    <v-container>
      <h1> しりとり </h1>
    </v-container>
    <v-container class="main">
      <v-row align="center" class="second">
        <v-col class="textfield">
          <v-text-field v-model="inputText" label="言葉を入力" />
        </v-col>
        <v-btn class="submit">
          送信
        </v-btn>
      </v-row>
      <v-row class="enemy">
        <v-col>
          相手の単語1
        </v-col>
      </v-row>
      <v-row class="player">
        <v-col>
          自分の単語1
        </v-col>
      </v-row>
      <v-row class="enemy">
        <v-col>
          相手の単語2
        </v-col>
      </v-row>
      <v-row class="player">
        <v-col>
          自分の単語2
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Shiritori extends Vue {
  hoge = true
}
</script>

<style scoped>
  /* .textfield {
    background-color: blue;
  }
  .second {
    background-color: violet;
  }
  .third {
    background-color: yellow;
  } */
  .submit {
    background-color: teal;
    margin-right: 10px;
    margin-left: 10px;
  }
  .enemy {
    background-color: #FFCDD2;
  }
  .player {
    background-color: #BBDEFB;
  }
</style>

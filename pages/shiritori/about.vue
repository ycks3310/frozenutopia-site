<template>
  <v-app light>
    <v-container>
      <h1> しりとり解説 </h1>
    </v-container>
    <v-container>
      <h3>実装で使用したライブラリなど（ありがとうございます）</h3>
      <ul>
        <li>Kuromoji.js 
          <a href="https://github.com/takuyaa/kuromoji.js/" target="_blank" rel="noopener noreferrer">
            https://github.com/takuyaa/kuromoji.js/
          </a>
        </li>
        <ul>
          <li>Java製形態素解析エンジンKuromoji
            (<a href="https://www.atilika.com/ja/kuromoji/" target="_blank" rel="noopener noreferrer">https://www.atilika.com/ja/kuromoji/</a>)
            のJavascript移植版だそうです。
          </li>
        </ul>
        <li>Mecab
          <a href="https://taku910.github.io/mecab/" target="_blank" rel="noopener noreferrer">
            https://taku910.github.io/mecab/
          </a>
        </li>
        <ul>
          <li>オープンソースの形態素解析エンジンです。上記Kuromoji.jsでも使われているMecab用IPA辞書を使わせていただきました。</li>
        </ul>
      </ul>
      <h3>言語・フレームワークなど</h3>
      <ul>
        <li>言語</li>
        <ul>
          <li>Typescript</li>
        </ul>
        <li>Webアプリケーションフレームワーク</li>
        <ul>
          <li>Nuxt.js</li>
          <li>Express</li>
        </ul>
        <li>UIフレームワーク</li>
        <ul>
          <li>Vuetify</li>
        </ul>
        <li>データベース</li>
        <ul>
          <li>PostgreSQL 12</li>
        </ul>
      </ul>
      <h3>システム構成（≒このWebサイト全体の構成）</h3>
      <v-img
        contain="true"
        max-width="300"
        src="/image/shiritori_arch.png"
        @click="shiritoriArchOverlay=true"
      />
      <v-overlay
        :value="shiritoriArchOverlay"
        opacity="0.6"
      >
        <v-img
          contain="true"
          width="95vw"
          src="/image/shiritori_arch.png"
          @click="shiritoriArchOverlay=false"
        />
      </v-overlay>
      <ul>
        <li>WebサーバはApp serviceのNodejsランタイムを採用</li>
        <ul>
          <li>フロントエンドはVuetify</li>
          <li>バックエンドはExpress</li>
        </ul>
        <li>PostgreSQLはAzure Virtual Machineにインストール</li>
        <ul>
          <li>PostgreSQLにはMecab用IPA辞書の単語リストを格納</li>
        </ul>
      </ul>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AboutShiritori extends Vue {
  public shiritoriArchOverlay = false
}
</script>

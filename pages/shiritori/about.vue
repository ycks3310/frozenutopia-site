<template>
  <v-app light>
    <v-container>
      <h1>
        <span class="underline1">
          <v-icon size="40px" color="blue">
            mdi-message-bulleted
          </v-icon>
          しりとり雑記
        </span>
      </h1>
    </v-container>
    <v-container>
      初版公開日：2021年7月11日
      <br>
      更新日：2021年7月18日
    </v-container>
    <v-container>
      <h3>
        <span class="underline1">
          実装で使用したライブラリなど（ありがとうございます）
        </span>
      </h3>
      <ul>
        <li>Kuromoji.js
          (<a href="https://github.com/takuyaa/kuromoji.js/" target="_blank" rel="noopener noreferrer">
            https://github.com/takuyaa/kuromoji.js/
          </a>)
        </li>
        <ul>
          <li>Java製形態素解析エンジンKuromoji
            (<a href="https://www.atilika.com/ja/kuromoji/" target="_blank" rel="noopener noreferrer">https://www.atilika.com/ja/kuromoji/</a>)
            のJavascript移植版だそうです。
          </li>
        </ul>
        <li>Mecab
          (<a href="https://taku910.github.io/mecab/" target="_blank" rel="noopener noreferrer">
            https://taku910.github.io/mecab/
          </a>)
        </li>
        <ul>
          <li>オープンソースの形態素解析エンジンです。上記Kuromoji.jsでも使われているMecab用IPA辞書を使わせていただきました。</li>
        </ul>
      </ul>
      <v-divider />
      <h3>
        <span class="underline1">
          実装のモチベーション
        </span>
      </h3>
      <ul>
        <li>Typescriptの勉強</li>
        <ul>
          <li>業務で実装を行うときのメインがphpなので、思い切って全てTypescriptで実装したくなった</li>
          <li>何を作ろうか考えていたときにKuromoji.jsを見つけて、「これあればインタラクティブなしりとり実装できるじゃん」と思い立ったのがきっかけ</li>
        </ul>
      </ul>
      <h3>
        <span class="underline1">
          所感など
        </span>
      </h3>
      <ul>
        <li>実装・構築について</li>
        <ul>
          <li>油断するとすぐコールバック関数だらけになって見通しが悪くなるので、async/awaitを使うように気を付ける</li>
          <li>型定義しないで適当にやったら結局バグるしTypescriptの意味がない（反省）（残タスク）</li>
          <li>手元の開発環境だと割と速くレスポンスが返ってくるが、App service(B1プラン)にデプロイしたらスペックが低いためかとても遅くなってしまった。Mecab用IPA辞書をcsvでメモリに持たせようとしたけど、メモリが足りなくなりそうと思ってデータベースに格納するようにしたのは正解だったかもしれない（詳細未検証）</li>
          <li>phpのswitch文はその仕様の曖昧検索のおかげでバグの温床すぎて絶対使わないようにしていたが、Typescriptは(Javascriptも？)割と大丈夫？</li>
          <ul>
            <li>php8.0だとswitch文に代わるmatch文なるものが追加されたそう（メモ）</li>
            <li><a href="https://www.php.net/manual/ja/control-structures.match.php" target="_blank" rel="noopener noreferrer">https://www.php.net/manual/ja/control-structures.match.php</a></li>
          </ul>
        </ul>
        <li>しりとりのゲーム性について</li>
        <ul>
          <li>システム側は約22万個の単語（Mecab用IPA辞書の名詞のcsvより生成）を保持しているのに対して、プレイヤー側の記憶している単語数はそれよりかは恐らく圧倒的に少ないはず</li>
          <li>この状況でシステムに対して真っ向勝負でしりとりを挑むとプレイヤーに勝ち目はない</li>
          <ul>
            <li>勝ち目がないどころか、SQL文に<code>WHERE furigana NOT LIKE '%ン'</code>とか入れてるからシステムのほうは無敵</li>
            <li>一度使った言葉をお手付きとして全ての単語を排出させたら勝ちとしても、プレイヤーに勝ち目はほぼないし、勝ち目がある人間が仮にいたとしても終わるまでにとんでもない時間がかかる（お手付きについては未実装、残タスク）</li>
          </ul>
          <li>なので、「ターン数表示」と「制限時間」を設けることで、「システムと勝負する」ではなく「いかにターン数を伸ばせるかという自分自身との勝負」とする工夫を入れ込んだ</li>
          <li>文字数が多い言葉は高得点、などの工夫を入れ込めばもう少しゲームらしくなるかもしれない</li>
        </ul>
      </ul>
      <h3>
        <span class="underline1">
          残タスクなど
        </span>
      </h3>
      <ul>
        <li>一度使った言葉に対するお手付き判定の追加</li>
        <li>JSONの型定義の実装→対応完了（2021年7月18日追記）</li>
        <li>スマホ上での表示に対応→メニューをしまうようにして暫定対処（2021年7月18日追記）</li>
        <ul>
          <li>しりとりページに限らず、このサイト全体の課題</li>
        </ul>
      </ul>
      <v-divider />
      <h3>
        <span class="underline1">
          特に悩んだところ
        </span>
      </h3>
      <ul>
        <li>node-postgresのPrepared StatementsでLIKE文のあいまい検索(%)がうまく動かない</li>
        <ul>
          <li><code>hoge LIKE '$1%'</code>と書くと動かない</li>
          <li><code>hoge LIKE $1</code>と書いて、<code>['%'+var1+'%']</code>のように%記号を文字列結合してからクエリに代入するとうまくいく</li>
        </ul>
        <li>node-postgresで何回かクエリを発行すると動かなくなってしまう</li>
        <ul>
          <li><code>const c = await pool.connect()</code>で取得したClientはクエリを実行した後に<code>c.release(true)</code>で開放しなければいけない</li>
        </ul>
      </ul>
      <v-divider />
      <h3>
        <span class="underline1">
          言語・フレームワークなど
        </span>
      </h3>
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
      <h3>
        <span class="underline1">
          システム構成（≒このWebサイト全体の構成）
        </span>
      </h3>
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
        <li>WebサーバのインフラにAzure App ServiceのNodejsランタイムを採用</li>
        <ul>
          <li>フロントエンドはNuxt.js + Vuetify + TypeScript</li>
          <li>バックエンドはNode.js + Express + TypeScript</li>
        </ul>
        <li>PostgreSQLはAzure Virtual Machineにインストール</li>
        <ul>
          <li>PostgreSQLにはMecab用IPA辞書の単語リストを格納</li>
        </ul>
      </ul>
      <h3>
        <span class="underline1">
          処理のおおまかな流れ
        </span>
      </h3>
      <ul>
        <li>1ターン目の言葉をPostgreSQLからランダムに取得</li>
        <li>ユーザーが次の言葉を入力する、フロント側からバックエンドへ送る</li>
        <li>Kuromoji.jsで形態素解析</li>
        <li>ルール違反をしていないか判別</li>
        <ul>
          <li>単語の個数を判別</li>
          <li>品詞の判別</li>
          <li>Mecab用IPA辞書に未登録の単語の判別</li>
          <li>言葉が「ん」で終わっていないか判別</li>
        </ul>
        <li>問題なければ、次の言葉をPostgreSQLからランダムに取得してフロント側に返す</li>
        <ul>
          <li>この際、言葉の一番最後の文字が捨て仮名のときは普通の文字に戻す</li>
        </ul>
        <li>フロント側で言葉を表示、ユーザーはそれを見て次の言葉を入力</li>
      </ul>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AboutShiritori extends Vue {
  head () {
    return {
      title: 'しりとり雑記'
    }
  }

  public shiritoriArchOverlay = false
}
</script>

<style scoped>
  code {
    font-family: Consolas;
  }
</style>

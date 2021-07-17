<template>
  <v-app light>
    <v-container>
      <p>最終更新日：2021年7月17日</p>
    </v-container>
    <v-container>
      <h1>
        <span class="underline1">
          <v-icon size="40px" color="blue">
            mdi-account
          </v-icon>
          私について
        </span>
      </h1>
      名前: K.S. (イニシャルです)
      <br>
      1993年に神奈川県に生まれ、神奈川県の県立高校普通科、大学: 環境情報学部(学士(環境情報学))、大学院: 情報学専攻(修士(工学))を経て2018年に新卒で大手情報通信系企業に入社しました。しかし、6か月で退職したと同時に現職のベンチャー企業に入社、そのまま現在に至り社会人歴4年目となりました。
      <br>
      現在は、社内向けの業務支援システム(Webサービス)の設計、実装、運用をフルスタックで担当しております。兼任で弊社ハードウェアの導入作業・保守作業をオンサイトならびにリモートで行うサービスエンジニア・サポートエンジニアとしての役割も担っております。
      <br>
      連絡先: {{ mailaddress }}
    </v-container>
    <v-container>
      <h1>
        <span class="underline1">
          <v-icon size="40px" color="blue">
            mdi-wrench
          </v-icon>
          スキル
        </span>
      </h1>
      学生アルバイトとしての業務から社会人として携わった業務までの技術経験一覧
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <h2><span class="underline1"> バックエンド </span></h2>
          <p>初業務から現在までphpメイン。最近はNode.jsにお熱。</p>
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">
                  技術
                </th>
                <th width="20%">
                  年数
                </th>
                <th width="40%">
                  コメント
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skillBackend" :key="skill.id">
                <td>{{ skill.skill }}</td>
                <td>{{ skill.years }}</td>
                <td>{{ skill.text }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col>
          <h2><span class="underline1"> データベース </span></h2>
          <p>関わる業務がMySQLのことが多い</p>
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">
                  技術
                </th>
                <th width="20%">
                  年数
                </th>
                <th width="40%">
                  コメント
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skillDatabase" :key="skill.id">
                <td>{{ skill.skill }}</td>
                <td>{{ skill.years }}</td>
                <td>{{ skill.text }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2><span class="underline1"> インフラ系 </span></h2>
          <p>現職の都合でクラウドは基本的にAzureメイン</p>
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">
                  技術
                </th>
                <th width="20%">
                  年数
                </th>
                <th width="40%">
                  コメント
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skillInfra" :key="skill.id">
                <td>{{ skill.skill }}</td>
                <td>{{ skill.years }}</td>
                <td>{{ skill.text }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col>
          <h2><span class="underline1"> フロントエンド </span></h2>
          <p>最近フロントエンド側も取り組み始めた</p>
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">
                  技術
                </th>
                <th width="20%">
                  年数
                </th>
                <th width="40%">
                  コメント
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skillFrontend" :key="skill.id">
                <td>{{ skill.skill }}</td>
                <td>{{ skill.years }}</td>
                <td>{{ skill.text }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2><span class="underline1"> その他 </span></h2>
          <p>その他のスキル、個人的な趣味で取り組んだものなど</p>
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">
                  技術
                </th>
                <th width="20%">
                  年数
                </th>
                <th width="40%">
                  コメント
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skillOthers" :key="skill.id">
                <td>{{ skill.skill }}</td>
                <td>{{ skill.years }}</td>
                <td>{{ skill.text }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col>
          <h2><span class="underline1"> 資格など </span></h2>
          <p>スキルに関係ないものも含む</p>
          <v-simple-table>
            <thead>
              <tr>
                <th>
                  名称
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in skillShikaku" :key="skill.id">
                <td>{{ skill.skill }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <h1>
        <span class="underline1">
          <v-icon size="40px" color="blue">
            mdi-web
          </v-icon>
          このサイトの構成について
        </span>
      </h1>
      <v-img
        contain="true"
        max-width="300"
        src="/image/shiritori_arch.png"
        @click="isArchOverlay=true"
      />
      <v-overlay
        :value="isArchOverlay"
        opacity="0.6"
      >
        <v-img
          contain="true"
          width="95vw"
          src="/image/shiritori_arch.png"
          @click="isArchOverlay=false"
        />
      </v-overlay>
      <ul>
        <li>WebサーバのインフラにAzure App ServiceのNode.jsランタイムを採用</li>
        <ul>
          <li>フロントエンドはNuxt.js + Vuetify + TypeScript</li>
          <li>バックエンドはNode.js + Express + TypeScript</li>
        </ul>
        <li>PostgreSQLはAzure Virtual Machineにインストール</li>
      </ul>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AboutMe extends Vue {
  isArchOverlay: boolean = false
  mailaddress: string = 'site@frozenutopia.net'

  skillBackend: any[] = [
    {
      skill: 'PHP (5.x, 7.x)',
      years: '5年',
      text: 'メイン言語。大学の卒論で実験プログラム作ったりしました。業務的には最初はMecab使ってフルスクラッチでシステム作ったりしてました。一時期はWordPressをいじったりとかしていましたが、現職ではもっぱらLaravelを使っています。'
    },
    {
      skill: '┗ Laravel',
      years: '3年',
      text: '最近のメイン。APIサーバー建てたり、バッチ処理作ってスケジューラーで回したりしてます。'
    },
    {
      skill: 'Python (3.x)',
      years: '4年',
      text: '大学院で主に使っていました。ディープラーニングとか自然言語処理とか。業務で画像処理とか統計処理を行うAPIサーバーを建てたりしたこともありましたが、最近はphpでも良い感じのライブラリあったりとか、簡単な計算なら自分で実装したりするので使わなくなってきました。'
    },
    {
      skill: 'Node.js',
      years: '2年',
      text: '主にTypeScript + Express。業務で新たにWebサイトを構築する機会があったのでチャレンジしています。'
    },
    {
      skill: 'Go',
      years: '1年',
      text: '他PJのシステムをいじるのに少しだけ使いました。'
    }
  ]

  skillFrontend: any[] = [
    {
      skill: 'TypeScript',
      years: '1年',
      text: '最近のチャレンジです。このWebサイトでも採用しています。'
    },
    {
      skill: 'Vue.js (Nuxt.js)',
      years: '1年',
      text: '最近のチャレンジです。このWebサイトでも採用。'
    },
    {
      skill: 'Vuetify',
      years: '1年',
      text: 'UIフレームワーク。日本語の情報サイトが多いので無学状態からでも何とかなっています。。。'
    }
  ]

  skillDatabase: any[] = [
    {
      skill: 'MySQL',
      years: '5年',
      text: 'なぜか業務でよく関わります。'
    },
    {
      skill: 'PostgreSQL',
      years: '2年',
      text: 'たまに関わります。たまにしか使わないからpsqlコマンドをよく忘れます。'
    },
    {
      skill: 'InfluxDB',
      years: '1年',
      text: '業務で関わる特殊な形式のデータを取り扱う時に使っていました。最近はMySQLに移行できたのでお役御免に。'
    }
  ]

  skillInfra: any[] = [
    {
      skill: 'Linux',
      years: '5年',
      text: '主にUbuntuを使ってます。AWS EC2のときだけAmazon Linux2にしています。'
    },
    {
      skill: 'シェルスクリプト',
      years: '5年',
      text: 'Bashで色々こねくり回して業務量減らす努力をしています。'
    },
    {
      skill: 'Docker',
      years: '4年',
      text: 'docker-compose含む。何かとDockerfileで作ってしまうので、Dockerなしは忘れがち。'
    },
    {
      skill: 'nginx',
      years: '4年',
      text: 'phpのリバースプロキシ用。こみ入ったことはできません。。。'
    },
    {
      skill: 'Azure',
      years: '3年',
      text: '業務で使っているメインのクラウド基盤。このWebサイトの基盤でもあります。'
    },
    {
      skill: '小規模事務所等のネットワーク設計・構築',
      years: '2年',
      text: '業務で取り扱うハードウェアの設置の際に関わらせていただいています。物理作業はクラウドとは違った面白さがあると思っています。'
    },
    {
      skill: 'AWS (EC2, S3)',
      years: '1年',
      text: '業務でEC2とS3だけ関わる機会があります。'
    }
  ]

  skillOthers: any[] = [
    {
      skill: 'Git',
      years: '5年',
      text: '言わずと知れたバージョン管理システム'
    },
    {
      skill: 'OpenCV',
      years: '2年',
      text: '画像処理するような業務でPython上で使っていました。ARマーカーで何か作りたい。。。'
    },
    {
      skill: 'Unity & C#',
      years: '1年',
      text: 'こちらも画像処理するような業務で少しだけ使っていました。'
    },
    {
      skill: 'Azure（自分用）',
      years: '趣味',
      text: 'このWebサイトのインフラ基盤です。'
    },
    {
      skill: 'Office 365 Business導入・運用（自分用）',
      years: '趣味',
      text: '独自ドメインで自分用のメールアドレスが欲しくなったのでAzureと組み合わせて導入・運用しています。'
    },
    {
      skill: 'Mastodon運用',
      years: '趣味',
      text: 'オープンソースの分散型SNSです。友人の間で使っています。Azure VM上のDockerコンテナで稼働中です。'
    }
  ]

  skillShikaku: any[] = [
    {
      skill: '基本情報処理技術者'
    },
    {
      skill: 'Azure Fundamentals (AZ-900)'
    },
    {
      skill: '第三級陸上特殊無線技士'
    },
    {
      skill: '第三級アマチュア無線技士'
    },
    {
      skill: '情報通信エンジニア（ビジネス）'
    },
    {
      skill: '乙種第4類危険物取扱者'
    },
    {
      skill: '準中型自動車（5t AT限定）免許'
    },
    {
      skill: '普通自動二輪車免許'
    }
  ]
}
</script>

<style scoped>
.underline1 {
  background: linear-gradient(transparent 90%, #81D4FA 90%)
}
</style>

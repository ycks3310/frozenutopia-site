<template>
  <v-app light>
    <v-container>
      <p>最終更新日：2021年7月16日</p>
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
      自己紹介
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
          <p>関わるPJがMySQLのことが多い</p>
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
          <p>その他のスキルなど</p>
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
          <li>フロントエンドはNuxt.js + Vuetify</li>
          <li>バックエンドはNode.js + Express</li>
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

  skillBackend: any[] = [
    {
      skill: 'PHP (5.x, 7.x)',
      years: '6年',
      text: 'あああ'
    },
    {
      skill: '┗ Laravel',
      years: '3年',
      text: 'あああ'
    },
    {
      skill: 'Python',
      years: '4年',
      text: 'あああ'
    },
    {
      skill: 'Node.js',
      years: '2年',
      text: '主にTypeScript + Express'
    },
    {
      skill: 'Go',
      years: '1年',
      text: 'あああ'
    }
  ]

  skillFrontend: any[] = [
    {
      skill: 'TypeScript',
      years: '1年',
      text: 'あああ'
    },
    {
      skill: 'Vue.js (Nuxt.js)',
      years: '1年',
      text: 'あああ'
    }
  ]

  skillDatabase: any[] = [
    {
      skill: 'MySQL',
      years: '6年',
      text: 'あああ'
    },
    {
      skill: 'PostgreSQL',
      years: '2年',
      text: 'あああ'
    },
    {
      skill: 'InfluxDB',
      years: '1年',
      text: 'あああ'
    }
  ]

  skillInfra: any[] = [
    {
      skill: 'Linux',
      years: '6年',
      text: '主にUbuntu'
    },
    {
      skill: 'シェルスクリプト',
      years: '5年',
      text: 'bash'
    },
    {
      skill: 'Docker',
      years: '4年',
      text: 'docker-compose含む'
    },
    {
      skill: 'Azure',
      years: '3年',
      text: 'あああ'
    },
    {
      skill: '小規模事務所等のネットワーク設計・構築',
      years: '2年',
      text: 'あああ'
    },
    {
      skill: '構成管理 (Ansible)',
      years: '2年',
      text: 'あああ'
    },
    {
      skill: 'AWS (EC2, S3)',
      years: '1年',
      text: 'あああ'
    }
  ]

  skillOthers: any[] = [
    {
      skill: 'OpenCV',
      years: '2年',
      text: 'aaa'
    },
    {
      skill: 'Unity & C#',
      years: '1年',
      text: 'あああ'
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

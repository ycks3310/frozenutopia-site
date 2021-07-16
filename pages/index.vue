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
    </v-container>
    <v-container>
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
    </v-container>
    <v-container>
      学生アルバイトとしての業務から社会人として携わった業務までの技術経験一覧
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <h2><span class="underline1"> バックエンド </span></h2>
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
                  内容
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
          <h2><span class="underline1"> フロントエンド </span></h2>
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
                  内容
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
          <h2><span class="underline1"> データベース </span></h2>
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
                  内容
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
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AboutMe extends Vue {
  hoge = true

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
      skill: 'Node.js (主にTypeScript + Express)',
      years: '1.5年',
      text: 'あああ'
    },
    {
      skill: 'Go',
      years: '1年',
      text: 'あああ'
    }
  ]

  skillFrontend: any[] = [
    {
      id: 1,
      skill: 'TypeScript',
      years: '1.5年',
      text: 'あああ'
    },
    {
      id: 2,
      skill: 'Vue.js (Nuxt.js)',
      years: '1.5年',
      text: 'あああ'
    }
  ]

    skillDatabase: any[] = [
      {
        id: 1,
        skill: 'MySQL',
        years: '6年',
        text: 'あああ'
      },
      {
        id: 2,
        skill: 'PostgreSQL',
        years: '2年',
        text: 'あああ'
      }
    ]
}
</script>

<style scoped>
.underline1 {
  background: linear-gradient(transparent 90%, #81D4FA 90%)
}
</style>

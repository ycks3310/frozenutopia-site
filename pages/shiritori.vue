<template>
  <v-app light>
    <v-container>
      <h1> しりとり </h1>
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

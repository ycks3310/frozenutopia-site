<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
    <!-- <v-navigation-drawer
      clipped
      permanent
      width="200px"
      app
    > -->
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      dense
      flat
      color="#E1F5FE"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Layout extends Vue {
  public drawer = true
  public items = [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-account',
      title: '私について',
      to: '/about'
    },
    {
      icon: 'mdi-google-controller',
      title: 'しりとり',
      to: '/shiritori'
    },
    {
      icon: 'mdi-help-circle',
      title: 'しりとり雑記',
      to: '/shiritori/about'
    }
  ]

  title = 'FROZENUTOPIA.NET'
}
</script>

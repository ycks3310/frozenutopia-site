<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      floating
      permanent
      mini-variant
      app
    >
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
      :clipped-left="clipped"
      dense
      flat
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Layout extends Vue {
  @Prop()
  clipped = false

  @Prop()
  drawer = false

  @Prop()
  items = [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire'
    }
  ]

  @Prop()
  title = 'Vuetify.js'
}
</script>

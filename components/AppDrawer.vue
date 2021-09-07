<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    mobile-breakpoint="960"
    :right="this.$i18n.localeProperties.dir == 'rtl' ? true : false"

  >

    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ this.$store.state.user.userName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t("drawer.subtitle") }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="localePath(item.to)"
          exact
          link
          nuxt
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ $t(item.title) }}
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
      <v-list-item
      link
      @click="logOut"
      >
        <v-list-item-icon >
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="caption">{{ $t('drawer.log-out') }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </template>

  </v-navigation-drawer>
</template>

<script lang="ts">
  import { ref, computed, useStore, useContext } from '@nuxtjs/composition-api'

  export default {
    name: 'Drawer',

    setup() {
      const items = ref<object[]> ([
          { title: "drawer.dashboard", icon: 'mdi-view-dashboard', to: '/' },
          { title: "drawer.setting", icon: 'mdi-cog', to: '/setting' },
          { title: "drawer.profile", icon: 'mdi-account', to: '/profile' },
          { title: "drawer.chat", icon: 'mdi-chat-question', to: '/chat' },
        ])

      const store = useStore()
      const { redirect, app }  = useContext()

      const drawer = computed({
        get () {
          return store.getters.drawer
        },
        set (val) {
          store.commit('SET_DRAWER', val)
        },
      })

      const logOut = () => {
        let locale: string = (app.i18n.locale == 'en' ? '' : app.i18n.locale)
        store.dispatch('logout')
        .then(() => redirect('/' + locale + '/login'))
      }

        return {
          items,
          drawer,
          logOut
        }
    }
  }
</script>

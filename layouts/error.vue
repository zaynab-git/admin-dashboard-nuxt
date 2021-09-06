<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { ref } from '@nuxtjs/composition-api'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },

  setup() {
    const pageNotFound = ref('404 Not Found')
    const otherError = ref('An error occurred')

    return {
      pageNotFound,
      otherError
    }
  },

  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
  
}
</script>
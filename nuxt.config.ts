// import colors from 'vuetify/es5/util/colors'
// import fa from 'vuetify/lib/locale/fa'
const fa = require('vuetify/lib/locale/fa')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  mode: 'spa',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - admin-dashboard-nuxt',
    title: 'admin-dashboard-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    // ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ 
    '~/plugins/chat-scroll.js',
    '~/plugins/vuelidate'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build'
  ],

  router: {
    middleware: 'vuetify'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  
  generate: {
    // choose to suit your project
    interval: 2000,
  },


  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        dir:'ltr'
      },
      {
        code: 'fa',
        name: 'فارسی',
        dir: 'rtl'
      },
    ],
    defaultLocale: 'en',
    defaultDirection: 'rtl',
    vueI18n: {
      // legacy: false,
      fallbackLocale: 'en',
      messages: 
      {
        en: JSON.parse(JSON.stringify(require('./static/locales/en.json'))),
        fa: JSON.parse(JSON.stringify(require('./static/locales/fa.json'))),
      }
    }
  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    // treeShake: true,
    lang: {
      locales: {fa},
    },
    theme: {
      dark: false,
      // themes: {
      //   dark: {
      //     primary: colors.blue.darken2,
      //     accent: colors.grey.darken3,
      //     secondary: colors.amber.darken3,
      //     info: colors.teal.lighten1,
      //     warning: colors.amber.base,
      //     error: colors.deepOrange.accent4,
      //     success: colors.green.accent3
      //   }
      // }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

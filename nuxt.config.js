import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,

  server: {
    port: 8383, // par défaut : 3000
    host: '0.0.0.0' // par défaut : localhost
  },

  generate: {
    fallback: true,
    routes() {
      return axios.get(`${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/recipe`).then(res => {
        return res.data.map((data) => {
          return '/' + data.slug
        })
      })
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f7a072' },

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/tailwind.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/composition',
    '@/plugins/disqus',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'en', iso: 'en_US', file: 'en-US.json', name: 'English' },
          { code: 'fr', iso: 'fr-FR', file: 'fr-FR.json', name: 'Français' },
          { code: 'ja', iso: 'ja', file: 'jp-JP.json', name: '日本人' }
        ],
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true
        },
        lazy: true,
        langDir: 'lang/'
      }
    ],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      treeShake: true,
      dark: false,
      themes: {
        light: {
          background: '#f8f8f8',
          primary: "#F7A072",
          background: '#f8f8f8',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: { icons: 'fa' }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}

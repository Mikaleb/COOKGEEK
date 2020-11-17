import colors from 'vuetify/es5/util/colors'
import head from './config/head'
import axios from 'axios'

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
  head,
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
    '@/plugins/disqus',
    { src: '@/plugins/captcha', mode: 'client' }
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
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-56116805-1'
      }
    ],
  ],

  generate: {
    // choose to suit your project
    interval: 2000,
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/device',
    '@nuxtjs/sitemap',
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true
      }
    ],
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    [
      'nuxt-i18n',
      {
        seo: true,
        locales: [
          { code: 'en', iso: 'en_US', file: 'en-US.json', name: 'English', isCatchallLocale: true },
          { code: 'fr', iso: 'fr-FR', file: 'fr-FR.json', name: 'Français' },
          { code: 'ja', iso: 'ja', file: 'jp-JP.json', name: '日本人' }
        ],
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true,
          onlyOnRoot: true
        },
        lazy: true,
        langDir: 'lang/'
      }
    ],
    ['nuxt-bugsnag', {
      apiKey: '1690164e4e6016f5484b56c7f9bb9523',
      reporterOptions: {
        releaseStage: process.env.NODE_ENV,
        autoAssignRelease: true
      },
      publishRelease: true,
    }]
  ],

  'google-adsense': {
    id: 'ca-pub-3386226072112083'
  },


  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 2,
    trailingSlash: true,
    gzip: true,
    i18n: 'en',
    routes: async () => {
      const { data } = await axios.get(`${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/recipe`)
      return data.map((data) => {
        const structData = {
          url: data.slug,
          links: ['en', 'fr', 'ja'].map((lang) => ({
            lang, url: `${lang}/${data.slug}`
          })),
        }
        return structData
        // return '/' + data.slug
      })
    }
  },

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

  pwa: {
    manifest: {
      "name": "Cuisine De Geek",
      "short_name": "CuisineDeGeek",
      "theme_color": "#f7a072",
      "background_color": "#F7A072",
      description: "Site of recipes from geek culture",
      icons: [
        {
          src: "/firefox-general-16-16.png",
          sizes: "16x16",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/firefox-general-32-32.png",
          sizes: "32x32",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/icon.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/firefox-general-90-90.png",
          sizes: "90x90",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/firefox-general-128-128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/firefox-general-256-256.png",
          sizes: "256x256",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/firefox-marketplace-512-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        },
      ],
      display: "standalone",
      lang: "en"
    }
  },
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
      defaultAssets: false,
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

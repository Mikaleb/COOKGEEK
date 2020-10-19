<template>
  <v-app dark>
    <v-app-bar fixed app color="#F7A072">
      <v-btn text href to="/" class="hidden-sm-and-down">
        <v-icon left color="white">fa-utensils</v-icon>
        <span class="text-white">{{ $tc('common.menu.recipe', 2) }}</span>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <nuxt-link :to="'/' + locale">
          <img
            data-src="/logo.svg"
            v-lazy-load
            :alt="title"
            style="height: 64px"
          />
          <!-- <span style="color:white">{{title}}</span> -->
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <div class="hidden-sm-and-down">
        <searchbar></searchbar>
      </div>

      <v-spacer />

      <v-btn text :to="'/shop'">
        <v-icon left color="white">fas fa-shopping-cart</v-icon>
        <span class="text-white">{{ $t('common.menu.shop') }}</span>
      </v-btn>
      <v-btn
        icon
        color="white"
        :href="`https://www.facebook.com/Cuisine2Geek`"
        class="hidden-sm-and-down"
      >
        <v-icon>fab fa-facebook</v-icon>
      </v-btn>
      <v-btn
        icon
        color="white"
        :href="`https://www.instagram.com/cuisinedegeek`"
        class="hidden-sm-and-down"
      >
        <v-icon>fab fa-instagram</v-icon>
      </v-btn>
      <v-btn
        icon
        color="white"
        :href="`https://twitter.com/CuisineDeGeek`"
        class="hidden-sm-and-down"
      >
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <div class="hidden-md-and-up">
          <searchbar></searchbar>
        </div>
        <v-row class="mt-6 mb-6">
          <v-col :lg="9" :md="9" :sm="12">
            <nuxt />
          </v-col>
          <v-col :lg="3" :md="3" :sm="12" offset-md="0" :offset-sm="0" class>
            <!-- Widgets -->
            <carousel-shop></carousel-shop>
            <info></info>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>



<script>
import CarouselShop from '~/components/Widget/CarouselShop.vue'
import Searchbar from '~/components/Search/Searchbar.vue'
import Info from '~/components/Widget/Info.vue'

export default {
  name: 'PageArticle',
  data() {
    return {
      article: [],
      image: '',
      title: 'Cuisine De Geek',
      description: this.$i18n.t('common.meta.description'),
      locale: this.$i18n.locale !== 'en' ? this.$i18n.locale : '' ,
    }
  },
  components: {
    CarouselShop,
    Searchbar,
    Info,
  },

  computed: {
    // Search system
    localUrl() {
      const baseUrl = process.env.NUXT_ENV_BASE_URL
        ? process.env.NUXT_ENV_BASE_URL
        : 'https://cuisinedegeek.com'

      return baseUrl + this.$route.fullPath
    },
  },

  head() {
    const websiteName = 'Cuisine De Geek'
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      title: this.title,
      meta: [
        {
          hid: 'op:markup_version',
          name: 'op:markup_version',
          content: 'v1.0',
        },
        { name: 'og:locale', content: this.$i18n.locale, hid: 'og:locale' },
        { hid: 'twitter:url', name: 'twitter:url', content: this.localUrl },
        {
          hid: 'application-name',
          name: 'application-name',
          content: websiteName,
        },
        { hid: 'og:url', name: 'og:url', content: this.localUrl },
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:title', name: 'og:title', content: websiteName },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https//cuisinedegeek.com/ogimage.png',
        },
        { hid: 'og:image:alt', name: 'og:image:alt', content: 'Logo' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Logo' },
        {
          hid: 'description',
          name: 'description',
          content: this.description || websiteName,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description || websiteName,
        },
        ...i18nSeo.meta,
      ],
      link: [...i18nSeo.link],
      htmlAttrs: {
        ...i18nSeo.htmlAttrs,
      },
    }
  },
}
</script>
<style lang="sass">
.theme--dark.v-application
  background-color: var(--v-background-base, #F8F8F8) !important
.theme--light.v-application
  background-color: var(--v-background-base, white) !important
</style>

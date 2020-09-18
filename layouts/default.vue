<template>
  <v-app dark>
    <v-app-bar fixed app color="#F7A072">
      <v-btn text href to="/" class="hidden-sm-and-down">
        <v-icon left color="white">fa-utensils</v-icon>
        <span class="text-white">{{ $tc('common.menu.recipe', 2) }}</span>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <nuxt-link to="/">
          <img data-src="/logo.svg" v-lazy-load :alt="title" style="height:64px" />
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
          <v-col :lg="7" :md="7" :sm="12">
            <nuxt />
          </v-col>
          <v-col :lg="4" :md="4" :sm="12" offset-md="1" :offset-sm="0" class>
            <!-- Widgets -->
            <carousel-shop></carousel-shop>
            <adsense></adsense>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <span class="mr-4">&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <LangSwitcher></LangSwitcher>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import LangSwitcher from '~/components/Menu/LangSwitcher.vue'
import Adsense from '~/components/Widget/Adsense.vue'
import CarouselShop from '~/components/Widget/CarouselShop.vue'
import Searchbar from '~/components/Search/Searchbar.vue'

export default defineComponent({
  name: 'ContentLayout',
  components: {
    LangSwitcher,
    CarouselShop,
    Searchbar,
    Adsense,
  },
  //@ts-ignore
  head() {
    return {
      meta: [
        {
          name: 'op:markup_version',
          content: 'v1.0',
          hid: 'op:markup_version',
        },
        { name: 'og:locale', content: this.locale, hid: 'og:locale' },
        {
          hid: 'description',
          name: 'description',
          content: this.description || 'Cuisine De Geek',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description || 'Cuisine De Geek',
        },
        { hid: 'twitter:url', name: 'twitter:url', content: this.url },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description || 'Cuisine De Geek',
        },
      ],
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const title = ref('Cuisine De Geek')
    const description = ctx.root.$i18n.t('common.meta.description')

    const slugUrl = () => {
      const Cookie = process.client ? require('js-cookie') : undefined
      const cookieLang = process.client
        ? Cookie.get('i18n_redirected')
          ? Cookie.get('i18n_redirected')
          : null
        : null
      let slugUrl = null
      if (cookieLang && cookieLang !== ctx.root.$i18n.defaultLocale) {
        slugUrl = '/' + cookieLang
      } else {
        slugUrl = '/'
      }
      return slugUrl
    }

    return {
      title,
      description,
      slugUrl,
    }
  },
})
</script>
<style lang="sass">
.theme--dark.v-application
  background-color: var(--v-background-base, #F8F8F8) !important
.theme--light.v-application
  background-color: var(--v-background-base, white) !important
</style>

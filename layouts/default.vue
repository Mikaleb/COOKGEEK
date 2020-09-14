<template>
  <v-app dark>
    <v-app-bar fixed app color="#F7A072">
      <v-btn text href>
        <v-icon left color="white">fa-utensils</v-icon>
        <span class="text-white">{{ $t('common.menu.recipe') }}</span>
      </v-btn>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn text href="https://cuisinedegeek.com/shop">
        <v-icon left color="white">fas fa-shopping-cart</v-icon>
        <span class="text-white">{{ $t('common.menu.shop') }}</span>
      </v-btn>
      <v-btn icon color="white" :href="`https://www.facebook.com/Cuisine2Geek`">
        <v-icon>fab fa-facebook</v-icon>
      </v-btn>
      <v-btn icon color="white" :href="`https://www.instagram.com/cuisinedegeek`">
        <v-icon>fab fa-instagram</v-icon>
      </v-btn>
      <v-btn icon color="white" :href="`https://twitter.com/CuisineDeGeek`">
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="mt-6 mb-6">
          <v-col :lg="7" :md="7" :sm="12">
            <nuxt />
          </v-col>
          <v-col :lg="4" :md="4" :sm="12" offset-md="1" :offset-sm="0" class>
            <p>Sidebar</p>
            <!-- Widgets -->
            <!-- <carousel-shop></carousel-shop> -->
            <!-- <adsense></adsense> -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <LangSwitcher></LangSwitcher>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import LangSwitcher from '~/components/Menu/LangSwitcher.vue'
export default defineComponent({
  name: 'ContentLayout',
  components: {
    LangSwitcher,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const title = ref('Cuisine De Geek')

    return {
      title,
    }
  },
})
</script>

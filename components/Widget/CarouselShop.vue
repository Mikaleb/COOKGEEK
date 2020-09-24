<template>
  <v-card shaped style="border-radius: 1rem !important" class="mb-8">
    <template>
      <a href="https://cuisinedegeek.com/shop">
        <v-card-title class="font-weight-bold">{{ $t('common.ads.shop') }}</v-card-title>
      </a>
      <v-card-text style="min-height:150px;min-width:150px">
        <v-carousel
          cycle
          lazy
          interval="12000"
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          v-if="products"
        >
          <v-carousel-item
            v-for="(product, i) in products.products"
            :key="i"
            :src="product.image.src"
            :href="'https://shop.cuisinedegeek.com/'"
            transition="fade-transition"
            class="pb-4"
          ></v-carousel-item>
        </v-carousel>
      </v-card-text>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'CarouselShop',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let products = ref({})

    onMounted(async () => {
      products.value = await axios.get('/products.json').then((res) => res.data)
    })

    return {
      products,
    }
  },
})
</script>

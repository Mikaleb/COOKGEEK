<template>
  <v-card shaped style="border-radius: 1rem !important" class="mt-4 mb-6">
    <template>
      <a href="https://instagram.com/CuisineDeGeek" target="_blank">
        <v-card-title class="font-weight-bold">
          <v-icon class="pr-4">fab fa-instagram</v-icon>Instagram
        </v-card-title>
      </a>
      <v-card-text style="min-height: 150px; min-width: 150px">
        <v-container fluid>
          <div class="pl-2">
            <v-avatar>
              <img src="/icon.png" alt="CDG Profile Instagram" />
            </v-avatar>

            <v-btn
              class="ml-4 ma-2 hidden-sm-and-down"
              tile
              color="indigo"
              dark
              href="https://instagram.com/CuisineDeGeek"
              target="_blank"
            >
              <i class="pr-1 fab fa-instagram"></i>
              <span>{{ $t('common.ads.instagram') }}</span>
            </v-btn>
            <p class="mt-2">
              CDG: Popculture Recipes
              <br />🍧 Food Pics Sharing - #popculture #recipes #geekfood
              <br />🎽🍀 Shop available <br />✈️ Fast worldwide shipping
              <br />⏬ Recipes - website in desc ( 🇺🇸🇫🇷🇯🇵 )
              <br />
            </p>
          </div>

          <v-row class="justify-center">
            <v-col cols="12">
              <v-row class="justify-center">
                <template v-for="(n, i) in data">
                  <template v-if="i <= 11">
                    <div class="ma-3 pa-3" :key="n.id">
                      <a :href="n.permalink" target="_blank">
                        <v-hover v-slot:default="{ hover }">
                          <v-img
                            :src="n.media_url"
                            :height="150"
                            :width="150"
                            :class="{ 'on-hover': hover }"
                          >
                            <v-skeleton-loader
                              v-bind="attrs"
                              type="image"
                              v-if="!n.media_url"
                            ></v-skeleton-loader>
                          </v-img>
                        </v-hover>
                      </a>
                    </div>
                  </template>
                </template>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import axios from 'axios'
//@ts-ignore

export default defineComponent({
  name: 'Insta',
  components: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let data = ref({})

    onMounted(async () => {
      data.value = await axios
        .get('/instagram.json')
        .then((res) => res.data.data)
    })

    return {
      data,
    }
  },
})
</script>

<style scoped>
.v-image {
  transition: opacity 0.3s ease-in-out;
  opacity: 0.5;
}

.v-image:not(.on-hover) {
  opacity: 1;
}
</style>

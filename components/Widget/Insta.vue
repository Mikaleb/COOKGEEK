<template>
  <v-card shaped style="border-radius: 1rem !important" class="mb-8">
    <template>
      <a href="https://cuisinedegeek.com/shop">
        <v-card-title class="font-weight-bold">{{ $t('common.ads.instagram') }}</v-card-title>
      </a>
      <v-card-text style="min-height:150px;min-width:150px">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-row class style="height: 300px;">
                <div class="ma-3 pa-3" v-for="(n,i) in data" :key="n.id">
                  <template v-if="i <= 8">
                    <!-- <instagram-embed :url="n.permalink" :max-width="150" :hide-caption="true" /> -->
                    <img :src="n.media_url" :width="150" />
                  </template>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import axios from 'axios'
//@ts-ignore
import InstagramEmbed from 'vue-instagram-embed'

export default defineComponent({
  name: 'Insta',
  components: {
    InstagramEmbed,
  },
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

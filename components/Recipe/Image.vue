<template>
  <div>
    <nuxt-link :to="propHref">
      <v-img
        :class="propClasses"
        v-if="propImageLink"
        :height="propHeight"
        :alt="propImageLink.alt_text"
        :src="urlImg"
        :max-height="maxh"
        :max-width="maxw"
      ></v-img>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'

import axios from 'axios'

export default defineComponent({
  name: 'RecipeImage',
  components: {},
  props: {
    imageLink: String,
    classProp: String,
    height: String,
    hrefProp: String,
    maxh: Number,
    maxw: Number,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const globalState = reactive({ searchResult: {} })
    const urlImg = ref('')

    const propImageLink = computed(() => props.imageLink)
    const propClasses = computed(() => props.classProp)
    const propHeight = computed(() => props.height)
    const propHref = computed(() => props.hrefProp)

    const loadFullDataset = async (val: any) => {
      // We need to load the data from the value passed, call api, then return the api data
      const { data } = await axios.get(val)
      globalState.searchResult = data
      urlImg.value =
        //@ts-ignore
        globalState.searchResult?.media_details?.sizes?.medium_large?.source_url
          ? //@ts-ignore
            globalState.searchResult?.media_details?.sizes?.medium_large
              ?.source_url
          : //@ts-ignore
            globalState.searchResult?.media_details?.sizes?.medium?.source_url
    }

    onMounted(async () => {
      await loadFullDataset(propImageLink.value)
    })

    return {
      propImageLink,
      propClasses,
      propHeight,
      ...toRefs(globalState),
      propHref,
      urlImg,
    }
  },
})
</script>

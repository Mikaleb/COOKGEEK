<template>
  <div>
    <v-dialog v-model="dialog" max-width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-if="getFeaturedImage(propData, 'medium')"
          :src="getFeaturedImage(propData, 'medium').source_url"
          :max-height="maxheight"
          class="rounded-lg cursor-pointer"
          v-bind="attrs"
          v-on="on"
        ></v-img>
      </template>

      <v-card>
        <v-img
          v-if="getFeaturedImage(propData, 'full')"
          :src="getFeaturedImage(propData, 'full').source_url"
          class="rounded-lg"
        ></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
} from '@nuxtjs/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'HoverImage',
  props: {
    data: Object,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    // @ts-ignore
    const propData = computed(() => props.data)
    const maxheight = computed(() => {
      switch (ctx.root.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 300
        case 'lg':
          return 300
        case 'xl':
          return 300
      }
    })

    const maxwidth = computed(() => {
      switch (ctx.root.$vuetify.breakpoint.name) {
        case 'xs':
          return 300
        case 'sm':
          return 400
        case 'md':
          return 300
        case 'lg':
          return 300
        case 'xl':
          return 300
      }
    })
    const dialog = false

    const getFeaturedImage = (recipe: any, size: any) => {
      let featuredImage = null
      featuredImage = recipe._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size]
      }
    }

    return { getFeaturedImage, propData, dialog, maxheight, maxwidth }
  },
})
</script>

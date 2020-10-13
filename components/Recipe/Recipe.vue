<template>
  <div>
    <!-- PC -->
    <article class="single hidden-sm-and-down" v-if="propData">
      <TitleCard :data="propData" v-if="propData"></TitleCard>
      <v-row class>
        <v-col :lg="4" :md="4">
          <Ingredients
            :data="propData.acf.ingredients"
            :nbIngredients="propData.acf.ingredients.length"
          ></Ingredients>
        </v-col>
        <v-col :lg="7" :md="7" :sm="12" offset-xs="0" offset-md="0">
          <steps v-if="propData" :steps="propData.acf.steps"></steps>
        </v-col>
      </v-row>
      <comments></comments>
    </article>

    <!-- Mobile -->
    <article class="single hidden-md-and-up" v-if="propData">
      <TitleCard :data="propData" v-if="propData"></TitleCard>
      <Ingredients
        :data="propData.acf.ingredients"
        :nbIngredients="propData.acf.ingredients.length"
      ></Ingredients>
      <steps v-if="propData" :steps="propData.acf.steps"></steps>
      <comments></comments>
    </article>
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
import Ingredients from '~/components/Recipe/Ingredients.vue'
import FeaturedImage from '~/components/Recipe/FeaturedImage.vue'
import Steps from '~/components/Recipe/Steps.vue'
import TitleCard from '~/components/Recipe/TitleCard.vue'
import Comments from '~/components/Comments.vue'
import HoverImage from '~/components/Recipe/HoverImage.vue'

export default defineComponent({
  name: 'Recipe',
  components: {
    FeaturedImage,
    Steps,
    Ingredients,
    TitleCard,
    Comments,
    HoverImage,
  },
  props: {
    data: Object,
    type: String,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    // @ts-ignore
    const { article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article
    const propData = computed(() => props.data)
    const colorAccentStyles = ref<any>(null)

    const getFeaturedImage = (recipe: any, size: any) => {
      let featuredImage = null
      featuredImage = recipe._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size]
      }
    }

    return { article, getFeaturedImage, colorAccentStyles, slug, propData }
  },
})
</script>

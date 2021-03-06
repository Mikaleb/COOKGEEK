<template>
  <script type="application/ld+json" v-if="updatedData && propData">
    {{updatedData}}
  </script>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'StructuredData',
  props: {
    data: Object,
    imageUrl: String,
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propData: any = computed(() => props.data)
    const propImg: any = computed(() => props.imageUrl)

    const url = computed(() => window.location.href)

    let structuredData: any = {
      '@context': 'http://schema.org',
      '@type': 'Recipe',
      author: {
        '@type': 'Person',
        name: 'Cuisine De Geek',
      },
    }

    const updatedData = ref()

    const getRecipeStructuredData = async () => {
      updatedData.value = structuredData

      const prepTime = propData.value.acf.preparing_time
        ? parseFloat(propData.value.acf.preparing_time)
        : 0
      const cookTime = propData.value.acf.cooking_time
        ? parseFloat(propData.value.acf.cooking_time)
        : 0
      const restTime = propData.value.acf.resting_time
        ? parseFloat(propData.value.acf.resting_time)
        : 0

      if (propData.value.id) {
        updatedData.value.name = propData.value.title.rendered
          ? propData.value.title.rendered
          : null
        updatedData.value.datePublished = propData.value.date
          ? propData.value.date
          : null

        updatedData.value.recipeYield = propData.value.acf.servings
          ? propData.value.acf.servings
          : null
        updatedData.value.recipeCategory = propData.value._embedded[
          'wp:term'
        ][0][0].name
          ? propData.value._embedded['wp:term'][0][0].name
          : null
        updatedData.value.description =
          propData.value.content.rendered &&
          propData.value.content.protected === false
            ? propData.value.content.rendered
            : null

        updatedData.value.prepTime = 'PT' + prepTime + 'M'
        updatedData.value.cookTime = 'PT' + cookTime + 'M'
        updatedData.value.totalTime =
          'PT' + (prepTime + cookTime + restTime) + 'M'

        updatedData.value.keywords = propData.value._embedded['wp:term'][1]
          ? propData.value._embedded['wp:term'][1]
              .map((data: any) => {
                return data.name
              })
              .join(', ')
          : null

        updatedData.value.recipeIngredient = propData.value.acf.ingredients
          ? propData.value.acf.ingredients.map((data: any) => {
              return data.quantity + ' ' + data.name
            })
          : null

        updatedData.value.recipeInstructions = propData.value.acf.steps
          ? propData.value.acf.steps.map((data: any, index: number) => {
              return {
                '@type': 'HowToStep',
                text: data.content,
                url: url.value + '#step' + (Number(index) + 1),
              }
            })
          : null
        if (propImg.value) {
          updatedData.value.image = propImg.value
        }
      }
    }

    onMounted(async () => {
      await getRecipeStructuredData()
    })

    return {
      propData,
      getRecipeStructuredData,
      structuredData,
      updatedData,
    }
  },
})
</script>

<template>
  <div class="home">
    <div class="articles" v-if="articles.length">
      <!-- <TheHero :hero-article="articlesList[0]" /> -->
      <h1 class v-cloak>{{ $tc('common.recipe.last', articles.length) }}</h1>
      <RecipeList :articles="articles" />
      <insta></insta>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import RecipeList from '~/components/Recipe/RecipeList.vue'
import Insta from '~/components/Widget/Insta.vue'

export default defineComponent({
  name: 'Index',
  components: {
    RecipeList,
    Insta,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { articles, article, fetchArticlesList } = usePosts({ ctx })
    onMounted(async () => {
      await fetchArticlesList('recipe')
    })
    return { articles }
  },
})
</script>

<template>
  <div class="article-list" v-if="articles">
    <article v-for="article in articles" :key="article.id">
      <template v-if="article.type === 'recipe'">
        <Excerpt :article="article" />
      </template>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Excerpt from '~/components/Recipe/Excerpt.vue'
export default defineComponent({
  name: 'RecipeList',
  components: {
    Excerpt,
  },
  props: {
    articles: Array,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {},
})
</script>

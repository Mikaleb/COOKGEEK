<template>
  <div class="mt-6 mb-6 article-list" v-if="articles">
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-space-around>
        <div class="d-flex" v-for="article in articles" :key="article.id">
          <template v-if="article.type === 'recipe'">
            <Excerpt :article="article" />
          </template>
        </div>
      </v-layout>
    </v-container>
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

<template>
  <v-card
    class="mb-6"
    max-width="344"
    v-if="propArticle._links"
    :sm="6"
    :md="propArticle._links['wp:featuredmedia'][0].href ? 9 : 12"
  >
    <RecipeImage
      :imageLink="propArticle._links['wp:featuredmedia'][0].href"
      :class-prop="'rounded'"
      height="200px"
      :hrefProp="slugUrl(propArticle.slug)"
    />

    <nuxt-link :to="slugUrl(propArticle.slug)">
      <v-card-title
        class="head-fond"
        v-html="propArticle.title.rendered"
      ></v-card-title>
    </nuxt-link>
    <v-card-text>
      <div id="content">
        <!-- Excerpt -->
        <span
          v-html="propArticle.content.rendered"
          v-if="propArticle.content.rendered"
        ></span>
        <!-- Time -->
        <v-chip-group column active-class="primary--text">
          <time-pill :article="propArticle"></time-pill>
          <Metas :data="propArticle"></Metas>
        </v-chip-group>
      </div>
    </v-card-text>

    <v-card-actions>
      <!-- <v-btn text>Share</v-btn> -->
      <!-- <v-btn color="purple" text>Explore</v-btn> -->
    </v-card-actions>
  </v-card>
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
import RecipeImage from '~/components/Recipe/Image.vue'
import TimePill from '~/components/Recipe/Time/Global.vue'
import Metas from '~/components/Recipe/Metas.vue'

export default defineComponent({
  name: 'ArticleExcerpt',
  components: { RecipeImage, TimePill, Metas },
  props: {
    article: Object,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propArticle = computed(() => props.article)

    const slugUrl = (slug: string) => {
      const Cookie = process.client ? require('js-cookie') : undefined
      const cookieLang = Cookie.get('i18n_redirected')

      let slugUrl = null
      if (cookieLang && cookieLang !== 'en') {
        slugUrl = cookieLang + '/recipe/' + slug + '/'
      } else {
        slugUrl = '/recipe/' + slug + '/'
      }
      return slugUrl
    }

    return { propArticle, slugUrl }
  },
})
</script>

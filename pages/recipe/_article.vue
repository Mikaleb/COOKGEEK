<template>
  <div class="w-full">
    <template v-if="article[0]">
      <template v-if="article[0].type === 'recipe'">
        <Recipe :data="article[0]" v-if="article[0]" type="recipe" />
        <StructuredData :data="article[0]" v-if="article[0]"></StructuredData>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
} from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import Recipe from '~/components/Recipe/Recipe.vue'
import StructuredData from '~/components/Recipe/StructuredData.vue'

export default defineComponent({
  name: 'PageArticle',
  head() {
    const meta: any[] = []
    if (this.title) {
      meta.push({ name: 'og:title', content: `${this.title}`, hid: 'og:title' })
      meta.push({
        name: 'og:description',
        content: `${this.title}`,
        hid: 'og:description',
      })
      meta.push({
        name: 'twitter:title',
        content: `${this.title}`,
        hid: 'twitter:title',
      })
      meta.push({
        name: 'twitter:description',
        content: `${this.title}`,
        hid: 'twitter:description',
      })
    }
    if (this.image) {
      meta.push({ name: 'og:image', content: `${this.image}`, hid: 'og:image' })
      meta.push({
        name: 'twitter:image',
        content: `${this.image}`,
        hid: 'twitter:image',
      })
    }
    if (this.imageCaption) {
      meta.push({
        name: 'og:image:alt',
        content: `${this.imageCaption}`,
        hid: 'og:image:alt',
      })
      meta.push({
        name: 'twitter:image:alt',
        content: `${this.imageCaption}`,
        hid: 'twitter:image:alt',
      })
    }

    return {
      title: `${this.title}`,
      meta,
    }
  },

  components: {
    Recipe,
    StructuredData,
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchArticleForUserLang, article } = usePosts({
      ctx,
    })
    const slug = ctx.root.$route.params?.article
    let title = ref('Cuisine De Geek')
    let image = ref('')
    let imageCaption = ref('')

    const loadFullDataset = async (val: any) => {
      const { data } = await axios.get(val)
      return data
    }

    onBeforeMount(async () => {
      await fetchArticleForUserLang({
        articleSlug: slug,
        subcategory: 'recipe',
      })
      if (article.value) {
        title.value = article.value[0]?.title.rendered
        if (article.value[0]['_links']) {
          const recipePictures = await loadFullDataset(
            article.value[0]['_links']['wp:featuredmedia'][0].href
          )

          if (recipePictures) {
            image.value = recipePictures.source_url
            imageCaption.value = recipePictures.caption.rendered
          }
        }
      }
    })

    return { article, title, image, loadFullDataset, imageCaption }
  },
})
</script>

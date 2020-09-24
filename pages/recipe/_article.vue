<template>
  <div class="w-full" v-if="article">
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
  computed,
  reactive,
  onBeforeMount,
  useMeta,
  useContext,
  useAsync,
} from '@nuxtjs/composition-api'
import usePosts from '~/composables/use-posts'
import Recipe from '~/components/Recipe/Recipe.vue'
import StructuredData from '~/components/Recipe/StructuredData.vue'

export default defineComponent({
  name: 'PageArticle',
  head: {},

  components: {
    Recipe,
    StructuredData,
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let image = ref('')
    let imageCaption = ref('')

    const cookieLang = ctx.root.$cookies.get('i18n_redirected')
    const slug = ctx.root.$route.params?.article
    const articleConfig = {
      articleSlug: slug,
      subcategory: 'recipe',
    }
    const article = useAsync(async () => {
      const url = `${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/${articleConfig.subcategory}`

      const { data } = await axios.get(url, {
        params: {
          slug: articleConfig.articleSlug,
          lang: cookieLang,
          _embed: true,
        },
      })

      return data
    })

    if (article.value) {
      const titleGenerator = () => {
        if (article.value[0]?.title.rendered) {
          return article.value[0]?.title.rendered + ' - Cuisine De Geek'
        }
        return 'Cuisine De Geek'
      }

      useMeta({
        meta: [
          {
            hid: 'og:description',
            name: 'og:description',
            content: titleGenerator(),
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: titleGenerator(),
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: titleGenerator(),
          },
        ],
      })

      if (article.value[0]['_links']) {
        const recipePictures = useAsync(async () => {
          const { data } = await axios.get(
            article.value[0]['_links']['wp:featuredmedia'][0].href,
            {
              params: {
                slug: articleConfig.articleSlug,
                _embed: true,
              },
            }
          )
          return data
        })

        if (recipePictures.value) {
        console.log('recipePictures', recipePictures.value)
          image.value = recipePictures.value.source_url
          imageCaption.value = recipePictures.value.caption.rendered
        }

        useMeta({
          meta: [
            {
              hid: 'og:image',
              name: 'og:image',
              content: image.value,
            },
            {
              hid: 'twitter:image',
              name: 'twitter:image',
              content: image.value,
            },
            {
              hid: 'og:image:alt',
              name: 'og:image:alt',
              content: imageCaption.value,
            },
          ],
        })
      }
    }

    return { article, image, imageCaption }
  },
})
</script>

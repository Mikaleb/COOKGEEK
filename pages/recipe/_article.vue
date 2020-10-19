<template>
  <div class="w-full" v-if="article">
    <template v-if="article[0]">
      <template v-if="article[0].type === 'recipe'">
        <Recipe
          v-if="article[0] && categories"
          :data="article[0]"
          :categories="categories"
          type="recipe"
        />
        <StructuredData
          :data="article[0]"
          :imageUrl="image.source_url"
          v-if="article[0]"
        ></StructuredData>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'PageArticle',
  data() {
    return {
      article: [],
      image: '',
      categories: [],
    }
  },
  async asyncData(context) {
    const slug = context.route.params.article
    const config = { articleSlug: slug, subcategory: 'recipe' }
    const cookieLang = context.$cookies.get('i18n_redirected')
    const categories = []

    const { data } = await context.$axios.get(
      `${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/${config.subcategory}`,
      {
        params: {
          slug: config.articleSlug,
          lang: cookieLang,
          _embed: true,
        },
      }
    )
    if (data[0]) {
      data[0].category.map(async (item, index) => {
        const { data } = await context.$axios.get(
          `${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/category/${item}`
        )

        const catData = {
          text: data.name,
          disabled: true,
          href: '#',
        }

        categories[index] = catData
      })
    }

    const recipePictures = await context.$axios.get(
      data[0]['_links']['wp:featuredmedia'][0].href,
      {
        params: {
          slug: config.articleSlug,
          _embed: true,
        },
      }
    )

    return { article: data, image: recipePictures.data, categories }
  },

  head() {
    const title = this.article[0].title.rendered
    const image = this.image.source_url
      ? this.image.source_url
      : 'https//cuisinedegeek.com/ogimage.png'
    const imageDescription = this.image.caption.rendered

    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: title,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: image,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image,
        },
        {
          hid: 'og:image:alt',
          name: 'og:image:alt',
          content: imageDescription,
        },
      ],
    }
  },
}
</script>


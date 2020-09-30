<template>
  <div class="w-full" v-if="article">
    <template v-if="article[0]">
      <template v-if="article[0].type === 'recipe'">
        <Recipe :data="article[0]" v-if="article[0]" type="recipe" />
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
    }
  },
  async asyncData(context) {
    const slug = context.route.params?.article
    const config = { articleSlug: slug, subcategory: 'recipe' }
    const cookieLang = context.$cookies.get('i18n_redirected')

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

    const recipePictures = await context.$axios.get(
      data[0]['_links']['wp:featuredmedia'][0].href,
      {
        params: {
          slug: config.articleSlug,
          _embed: true,
        },
      }
    )

    return { article: data, image: recipePictures.data }
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


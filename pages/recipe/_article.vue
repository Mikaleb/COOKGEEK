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

<script>
export default {
  data() {
    return {
      article: [],
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

    return { article: data }
  },

  head() {
    return {
      title: this.article[0].title.rendered,
    }
  },
}
</script>

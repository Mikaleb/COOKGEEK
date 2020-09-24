import { reactive, toRefs, SetupContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import { ArticleConfig, Article } from '@/types/article'

interface Options {
  ctx: SetupContext
}

type globalState = {
  articles: object | null
  article: Article[] | null
}

export default function usePosts({ ctx }: Options) {
  // Setting up the endpoint
  const apiState: any = reactive({
    response: [],
    error: null,
    fetching: false,
  })

  const globalState: globalState = reactive({
    articles: {},
    article: [],
  })

  const Cookie = process.client ? require('js-cookie') : undefined
  const cookieLang = process.client
    ? Cookie.get('i18n_redirected')
      ? Cookie.get('i18n_redirected')
      : null
    : null

  const fetchArticlesList = async (subtype: string = 'posts') => {
    apiState.fetching = true

    const { data } = await axios.get(
      `${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/${subtype}?orderby=date&per_page=10&_embed`,
      {
        params: {
          _embed: true,
          lang: cookieLang,
        },
      }
    )
    globalState.articles = data
  }

  const fetchArticleData = async (config: ArticleConfig) => {
    apiState.fetching = true

    const { data } = await axios.get(
      `${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/${config.subcategory}`,
      {
        params: {
          slug: config.articleSlug,
          id: config.id,
          lang: cookieLang,
          _embed: true,
        },
      }
    )
    globalState.article = data
    return data
  }

  return {
    ...toRefs(apiState),
    ...toRefs(globalState),
    fetchArticlesList,
  }
}

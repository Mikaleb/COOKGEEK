export interface ArticleConfig {
  articleSlug?: string
  id?: number
  subcategory: string
}

export interface Article {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  excerpt: { rendered: string; protected: boolean }
  author: number
  featured_media: number
  parent: number
  menu_order: number
  template: string
  category: any
  post_tag: any
  lang: string
  translations: any
  acf: any
  pll_sync_post: any
  _links: any
  _embedded: object
  'wp:term': any
}

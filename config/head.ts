const siteTitle = 'Cuisine De Geek'

export default {
  title: siteTitle,
  titleTemplate: (title: any) => {
    if (title === 'Cuisine De Geek') {
      return title
    }
    return `${title} - Cuisine De Geek`
  },
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#f7a072' },
    { name: 'robots', content: 'index,follow' },
    { name: 'googlebot', content: 'index,follow' },
    // -- OpenGraph --
    { hid: 'og:site_name', name: 'og:site_name', content: siteTitle },
    { hid: 'og:title', name: 'og:title', content: siteTitle },
    { hid: 'theme-color', name: 'theme-color', content: '#f7a072' },
    {
      hid: 'mobile-web-app-capable',
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    // -- Twitter --
    { hid: 'twitter:title', name: 'twitter:title', content: siteTitle },
    {
      hid: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      content: siteTitle,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    { hid: 'twitter:site', name: 'twitter:site', content: '@CuisineDeGeek' },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: siteTitle,
    },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/ogimage.png' },
    { rel: 'apple-touch-startup-image', href: '/ogimage.png' },
    { rel: 'alternate', hreflang: 'fr', href: '/fr' },
    { rel: 'alternate', hreflang: 'ja', href: '/ja' },
    { rel: 'me', href: 'mailto:contact@cuisinedegeek.com' },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap',
    },
  ],
}

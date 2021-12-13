import getRoutes from './utils/getRoutes'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  server: {
    host: process.env.NODE_ENV !== 'production' ? '0' : 'https://camphul.github.io/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Camphul\'s Github Pages Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { httpEquiv: 'X-UA-Compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: 'Luca Camphuisen also known as Camphul his personal blog on Github Pages.' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'Camphul\'s Blog' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.4.0/dist/typography.min.css',
        integrity: 'sha256-1N7QO4ZmJwKGUSQgvYQOhPQrTlEWHqaSScabMik+Bks=',
        crossOrigin: 'anonymous'
      }
    ]
  },
  env: {
    baseUrl: process.env.NODE_ENV !== 'production' ? process.env.BASE_URL || '' : 'https://camphul.github.io/'
  },
  sitemap: {
    hostname: process.env.NODE_ENV !== 'production' ? process.env.HOST || '' : 'https://camphul.github.io/', // https://www.yoursite.com
    routes () {
      return getRoutes()
    },
    gzip: true,
    exclude: [
      '/**.[css|js|webp|png|jpg|jpeg|mp3|mp4]'
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  generate: {
    routes () {
      return getRoutes()
    }
  },
  router: {
    base: process.env.NODE_ENV !== 'production' ? '/' : '/'
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/components'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap'
  ],
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      short_name: 'Camphul\'s blog',
      name: 'Camphul\'s Blog on Github Pages',
      author: 'Luca Camphuisen',
      theme_color: '#1f2937',
      scope: '/',
      start_url: process.env.NODE_ENV !== 'production' ? '/' : process.env.baseUrl,
      developer: {
        name: 'Luca Camphuisen',
        url: 'https://github.com/Camphul'
      },
      description: 'Luca Camphuisen, also known as Camphul his personal Github Pages Blogging site.',
      dir: 'ltr',
      lang: 'en-US',
      orientation: 'portrait-primary'
    },
    icon: {
      purpose: 'maskable'
    }
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|vue)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: process.env.NODE_ENV !== 'production'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    babel: {
      presets: []
    }
  }
}

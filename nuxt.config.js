import qs from 'qs'
import i18n from './plugins/i18n.js'
process.env.DEBUG = 'nuxt:*'

export default {
  ssr: false,
  target: 'static',
  devtools: true,
  debug: true,
  loading: '~/mobile/components/Loader.vue',
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  auth: {
    strategies: {
      laravelPassport: {
        url: process.env.API_URL,
        provider: 'laravel/passport',
        endpoints: {
          authorization: {
            url: '/oauth/token'
          },
          user: {
            url: '/user/profile'
          }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 2
        },
        refreshToken: {
          maxAge: 60 * 60 * 24 * 2
        },
        user: {
          property: 'data.user'
        },
        grantType: process.env.GRANT_TYPES_CLIENT,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.API_SECRET
      }
    }

  },
  axios: {
    proxy: true,
    baseURL: process.env.API_URL,
    requestInterceptor: (config) => {
      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          arrayFormat: 'indices',
          skipNulls: true
        })
      }
      return config
    }
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL_BROWSER
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL
    }
  },

  // proxy: {
  //   '/api': {
  //     target: process.env.API_URL_BROWSER,
  //     pathRewrite: { '^/api': '' },
  //     changeOrigin: true
  //   },
  //   '/laravel': {
  //     target: process.env.API_URL_LARAVEL,
  //     pathRewrite: { '^/laravel': '' },
  //     changeOrigin: true
  //   }
  // },
  head: {
    titleTemplate: 'Olchauz',
    title: 'olchauz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/common.css',
    '~/assets/css/tailwind.css',
    '~/assets/scss/main.scss',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  ],

  plugins: [
    { src: '~/plugins/vue-slick-carousel.js', ssr: false },
    { src: '~/plugins/language.js' },
    { src: '~/plugins/aspectImage' },
    { src: '~/plugins/async-computed.js' },
    { src: '~/plugins/v-validate.js' },
    { src: '~/plugins/v-mask.js' },
    { src: '~/plugins/api.js' },
    { src: '~/plugins/seo.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/datepicker', ssr: false },
    { src: '~/plugins/persistedState.client.js' }
    // { src: '~/plugins/i18n.js' }
  ],
  build: {
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    }
  },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa'
  ],

  eslint: {
    fix: true
  },

  static: {
    prefix: false
  },

  i18n: {
    defaultLocale: 'oz',
    vueI18nLoader: true,
    locales: [
      'ru',
      'uz',
      'oz'
    ],
    vueI18n: i18n
  },
  cache: {
    useHostPrefix: false,
    pages: [
      '/',
      /^\/$/
    ],

    key (route, context) {
    },

    store: {
      type: 'memory',

      max: 100,

      ttl: 3600
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/router',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'nuxt-lazy-load',
    ['vue-toastification/nuxt', {
      timeout: 3000,
      position: 'top-right',
      pauseOnHover: false,
      hideProgressBar: true,
      maxToasts: 1,
      icon: false
    }]
  ],

  loadingIndicator: {
    name: 'chasing-dots',
    color: '#3B8070',
    background: 'white'
  },
  styleResources: {
    scss: ['./assets/scss/*.scss']
  }
}

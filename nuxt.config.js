require('dotenv').config()
export default {

  server: {
    port: process.env.NUXT_PORT // default: 3000
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    // '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  purgeCSS: {
    whitelist: ['dark-mode'],
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    'semantic-ui-vue/nuxt',
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth'
    
  ],
  
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL,
    proxyHeaders: false,
    credentials: false,
    proxy: false // Can be also an object with default options
  },

  auth: {
    plugins: [ { src: '~/plugins/axios', ssr: true },],

    // Options
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/api/v1/auth/logout',
            method: 'post'
          },
          user: {
            url: '/api/v1/auth/me',
            method: 'get',
            propertyName: false
          }
        }
      }
    }
  },

  
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}

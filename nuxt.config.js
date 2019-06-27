module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'My Youtube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons' }
    ]
  },
  /**
   * Axios
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'

  ],

  axios: {
    // proxyHeaders: false
    baseURL: 'http://192.168.197.135:8080/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth', method: 'post', propertyName: 'token' },
          user: false,
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/',
      logout: '/',
    }
  },

  css: [
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
    { src: '~/assets/theme.scss', lang: 'scss' } // include vue-material theme engine
  ],
  plugins: [
    { src: '~/plugins/vue-material' },
    // { src: '~/plugins/localStorage.js', ssr: false}
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ["vue-material"],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}


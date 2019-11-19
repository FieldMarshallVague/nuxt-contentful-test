require('dotenv').config();
const contentful = require('contentful');

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff0000' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/dotenv', '@nuxtjs/markdownit'],

  /**
   * Markdown module config
   */
  markdownit: {
    injected: true
  },
  /*
   ** Build configuration
   */
  build: {

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
          config.module.rules.push({
              enforce: 'pre',
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              exclude: /(node_modules)/
          });
          config.module.rules.push({
              test: /(\.vue|\.js)$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              exclude: /.nuxt/
          });
      }
      config.node = {
          fs: 'empty'
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  /**
   * Statically generate the site (so contentful isn't loading from client)
   */
  generate: {
    routes: () => {
      const client = contentful.createClient({
        space:  process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CD_ACCESS_TOKEN
      });

      client.getEntries({
        content_type: 'navItem'
      }).then((response) => {
        return response.items.map(entry => {
          return {
            route: entry.fields.slug,
            payload: entry
          };
        });
      });

      return client.getEntries({
        content_type: 'blogPost'
      }).then((response) => {
        return response.items.map(entry => {
          return {
            route: entry.fields.slug,
            payload: entry
          };
        });
      });
    }
  }
}

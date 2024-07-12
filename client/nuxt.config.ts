// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: ['@nuxt/eslint', "@nuxtjs/tailwindcss",
        [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
      },
    ],
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // setting the API Proxy
  routeRules: {
    '/api/**': {
      proxy: 'http://localhost:8000/**'
    }
  },
  css: ['~/assets/css/main.css'],
})
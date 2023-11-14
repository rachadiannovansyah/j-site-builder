// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icons',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Lato: [300, 400, 700],
          Roboto: [300, 400, 500, 700],
          Lora: [400, 500, 700],
          Inter: [300, 400, 500, 700],
        },
      },
    ],
  ],
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      portalJabarCMSBaseURL: process.env.NUXT_PUBLIC_PORTAL_JABAR_CMS_BASE_URL,
      jSiteApiURL: process.env.NUXT_PUBLIC_J_SITE_API_URL,
    },
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', () => {
    // handle error, e.g. report to a service
  })
})

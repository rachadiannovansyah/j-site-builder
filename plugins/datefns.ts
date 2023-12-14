import * as datefns from 'date-fns'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('datefns', datefns)
})

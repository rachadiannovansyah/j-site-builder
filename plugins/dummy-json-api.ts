import { $fetch, FetchOptions } from 'ofetch'
import ProductModules from '~/repository/dummy-json/modules/products'

interface IApiInstance {
  products: ProductModules
  // ...add another modules here
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.dummyJsonApiURL,
    onRequest: async ({ options }) => {
      console.log('request interceptor!', options.headers)
    },
    headers: {
      Test: 'Test Header',
    },
  }

  const apiFecther = $fetch.create(fetchOptions)

  const modules: IApiInstance = {
    products: new ProductModules(apiFecther),
    // ...add other modules here
  }

  return {
    provide: {
      dummyJsonApi: modules,
    },
  }
})

import { $fetch, FetchOptions } from 'ofetch'
import UsersModule from '~/repository/json-placeholder/modules/users'

interface IApiInstance {
  users: UsersModule
  // ...add another modules here
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.jsonPlaceholderApiURL,
    onRequest: async ({ options }) => {
      console.log('request interceptor!', options.headers)
    },
    headers: {
      Test: 'Test Header',
    },
  }

  const apiFecther = $fetch.create(fetchOptions)

  const modules: IApiInstance = {
    users: new UsersModule(apiFecther),
    // ...add other modules here
  }

  return {
    provide: {
      jsonPlaceholderApi: modules,
    },
  }
})

import { $fetch, FetchOptions } from 'ofetch'
import TemplateModule from '~/repository/j-site/modules/template'

interface IApiInstance {
  templates: TemplateModule
  // ...add another modules here
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const fetchOptions: FetchOptions = {
    baseURL: config.public.jSiteApiURL as string,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  }
  const apiFecther = $fetch.create(fetchOptions)

  const modules: IApiInstance = {
    templates: new TemplateModule(apiFecther),
    // ...add other modules here
  }

  return {
    provide: {
      jSiteApi: modules,
    },
  }
})

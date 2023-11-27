import { $fetch, FetchOptions } from 'ofetch'
import TemplateModule from '~/repository/j-site/modules/template'
import SettingsModule from '~/repository/j-site/modules/settings'
import PageModule from '~/repository/j-site/modules/page'
import MediaModule from '~/repository/j-site/modules/media'

interface IApiInstance {
  templates: TemplateModule
  settings: SettingsModule
  page: PageModule
  media: MediaModule
  // ...add another modules here
}

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const fetchOptions: FetchOptions = {
    baseURL: config.public.jSiteApiURL as string,
    async onRequest({ options }) {
      options.headers = {
        Authorization: `Bearer ${token.value}`,
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        throw showError({
          statusCode: 401,
        })
      }
    },
  }
  const apiFecther = $fetch.create(fetchOptions)

  const modules: IApiInstance = {
    templates: new TemplateModule(apiFecther),
    settings: new SettingsModule(apiFecther),
    page: new PageModule(apiFecther),
    media: new MediaModule(apiFecther),
    // ...add other modules here
  }

  return {
    provide: {
      jSiteApi: modules,
    },
  }
})

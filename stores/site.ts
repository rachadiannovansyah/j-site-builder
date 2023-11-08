import { ISiteSetting } from '~/repository/j-site/types/settings'

export const useSiteStore = defineStore('site', {
  state: () => ({
    sites: null as null | ISiteSetting[],
    siteId: null as string | null,
  }),
  getters: {
    siteName(state) {
      const selectedSite = state.sites?.find((site) => site.id === state.siteId)
      return selectedSite?.name || ''
    },
  },
  actions: {
    setSiteId(id: string) {
      this.siteId = id
    },
  },
  persist: true,
})

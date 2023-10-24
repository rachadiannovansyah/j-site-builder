export const useSiteStore = defineStore('site', {
  state: () => ({
    siteId: null as string | null,
  }),
  actions: {
    setSideId(id: string) {
      this.siteId = id
    },
  },
})

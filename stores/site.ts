export const useSiteStore = defineStore('site', {
  state: () => ({
    siteId: null as string | null,
  }),
  actions: {
    setSideId(id: string) {
      this.siteId = id
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },
})

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false as boolean,
  }),
  actions: {
    setLoading(bool: boolean) {
      this.loading = bool
    },
  },
})

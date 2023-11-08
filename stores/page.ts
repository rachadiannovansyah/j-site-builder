import { IPageStructure } from '~/types/stores/page'

export const usePageStore = defineStore('page', {
  state: () => ({
    page: null as null | IPageStructure,
  }),
  getters: {
    selectedPage(state) {
      return state.page
    },
  },
  actions: {
    setPage(page: IPageStructure) {
      this.page = page
    },
  },
  persist: true,
})

export const usePageStore = defineStore('page', {
  state: () => ({
    builderConfig: {
      type: '',
      templateId: '',
    },
  }),
  getters: {},
  actions: {
    setPageType(value: string) {
      this.builderConfig.type = value
    },
    setPageTemplate(value: string) {
      this.builderConfig.templateId = value
    },
  },
})

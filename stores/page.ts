import { ITemplateSection } from '~/repository/j-site/types/template'
type IBuilderConfigStatus = 'DRAFT' | 'PUBLISHED'

export const usePageStore = defineStore('page', {
  state: () => ({
    builderConfig: {
      type: null as null | string,
      templateId: null as null | string,
      title: null as null | string,
      status: null as null | IBuilderConfigStatus,
      domain: null as null | string,
      lastUpdate: null as null | string,
      sections: [] as ITemplateSection[],
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
    setPageTitle(value: string) {
      this.builderConfig.title = value
    },
    setPageDomain(value: string) {
      this.builderConfig.domain = value
    },
    setBuilderSections(value: ITemplateSection[]) {
      this.builderConfig.sections = value
    },
  },
})

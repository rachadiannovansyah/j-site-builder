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
  getters: {
    getWidgetPayload(state) {
      return ({
        sectionIndex,
        widgetIndex,
      }: {
        sectionIndex: number
        widgetIndex: number
      }) =>
        state.builderConfig.sections[sectionIndex].widgets[widgetIndex].payload
    },
  },
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
    /**
     * Store widget configuration data for each section
     * @param sectionIndex - index of section currently being changed
     * @param widgetIndex - index of widget currently being changed
     * @param payload - widget payload used for submiting data
     */
    setWidgetPayload({
      sectionIndex,
      widgetIndex,
      payload,
    }: {
      sectionIndex: number
      widgetIndex: number
      payload: object
    }) {
      this.builderConfig.sections[sectionIndex].widgets[widgetIndex].payload = {
        ...payload,
      }
    },
    setSectionTitle({
      sectionIndex,
      title,
    }: {
      sectionIndex: number
      title: string
    }) {
      this.builderConfig.sections[sectionIndex].title = title
    },
    setSectionDescription({
      sectionIndex,
      description,
    }: {
      sectionIndex: number
      description: string
    }) {
      this.builderConfig.sections[sectionIndex].description = description
    },
  },
})

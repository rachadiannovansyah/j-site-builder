import { ITemplateSection } from '~/repository/j-site/types/template'
type IBuilderConfigStatus = 'DRAFT' | 'PUBLISHED'

export const usePageStore = defineStore('page', {
  state: () => ({
    builderConfig: {
      pageToken: '' as string,
      type: '' as string,
      templateId: '' as string,
      title: '' as string,
      status: null as null | IBuilderConfigStatus,
      domain: '' as string,
      lastUpdate: '' as string,
      sections: [] as ITemplateSection[],
      category: null as null | string,
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
    setPageToken(value: string) {
      this.builderConfig.pageToken = value
    },
    setPageType(value: string) {
      this.builderConfig.type = value
    },
    setPageCategory(value: string) {
      this.builderConfig.category = value
    },
    setPageTemplate(value: string) {
      this.builderConfig.templateId = value
    },
    setPageTitle(value: string) {
      this.builderConfig.title = value
    },
    setPageStatus(value: IBuilderConfigStatus) {
      this.builderConfig.status = value
    },
    setPageLastUpdate(value: string) {
      this.builderConfig.lastUpdate = value
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
      const originalPayload =
        this.builderConfig.sections[sectionIndex].widgets[widgetIndex].payload

      this.builderConfig.sections[sectionIndex].widgets[widgetIndex].payload = {
        ...originalPayload,
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
    generatePageData({ status }: { status: IBuilderConfigStatus }) {
      return {
        title: this.builderConfig.title,
        status: status,
        page_token: this.builderConfig.pageToken,
        sections: [...this.builderConfig.sections],
        category: this.builderConfig.category ?? '',
      }
    },
  },
})

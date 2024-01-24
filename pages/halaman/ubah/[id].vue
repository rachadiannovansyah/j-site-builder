<template>
  <div class="h-full w-full bg-[#F3F4F8] pb-24">
    <PageBuilderHeader :loading="fetchSettingLoading" :is-edit-mode="true" />
    <div class="flex h-full w-full justify-between gap-4 px-1 py-4">
      <PageBuilderContent :loading="fetchPageLoading" />
      <PageBuilderAside />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { format } from 'date-fns'
  import ID from 'date-fns/locale/id'

  definePageMeta({
    layout: 'full-bleed',
  })

  const pageStore = usePageStore()
  const siteStore = useSiteStore()
  const { $jSiteApi } = useNuxtApp()
  const route = useRoute()

  const { data: setting, pending: fetchSettingLoading } =
    await $jSiteApi.settings.getSettingsById(
      siteStore?.siteId ?? '',
      undefined, // no query params for this request
      { server: false, lazy: true },
    )

  watch(setting, () => {
    pageStore.setPageDomain(toRaw(setting.value?.data?.domain || ''))
  })

  const fetchPageLoading = ref(true)

  async function setInitialData() {
    const pageId = route.params.id.toString()

    const {
      data: dataPage,
      status,
      error,
      pending,
    } = await $jSiteApi.page.getPageById(siteStore?.siteId ?? '', pageId, {
      server: false,
    })

    if (status.value === 'success') {
      const { data } = dataPage.value ?? {}
      if (data) {
        const { title, status, updated_at, sections } = data

        pageStore.setPageTitle(title ?? '')
        pageStore.setPageStatus(status || '')
        pageStore.setPageLastUpdate(updated_at ? formatDate(updated_at) : '')
        pageStore.setBuilderSections(sections ?? [])
        Array.isArray(
          sections.map((dataSection, sectionIndex) => {
            Array.isArray(
              dataSection.widgets.map((dataWidget, widgetIndex) => {
                pageStore.setWidgetPayload({
                  sectionIndex: sectionIndex,
                  widgetIndex: widgetIndex,
                  payload: dataWidget?.payload || {},
                })
              }),
            )
          }),
        )
      }
    }

    if (status.value === 'error') {
      console.error(error)
    }

    fetchPageLoading.value = pending.value
  }

  onMounted(() => {
    setInitialData()
    window.addEventListener('beforeunload', beforeUnloadHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler)
    pageStore.$reset()
  })

  function beforeUnloadHandler(event: Event) {
    event.preventDefault()
  }

  function formatDate(date: string) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ID })
  }
</script>

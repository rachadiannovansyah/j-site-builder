<template>
  <section
    class="flex h-full w-full flex-col gap-4 rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
  >
    <div class="mb-8 flex items-start justify-between sm:flex-wrap">
      <div class="flex gap-8">
        <SearchBar placeholder="Cari Halaman" />
        <FilterBar />
      </div>
      <UButton v-if="!isPagesDataEmpty" @click="createPageFirstStep">
        <template #leading>
          <NuxtIcon
            name="common/plus"
            class="text-lg text-white"
            aria-hidden="true"
          />
        </template>
        Buat Halaman Baru
      </UButton>
    </div>
    <div class="flex h-full w-full flex-col items-center justify-center">
      <NoData
        title="Kamu belum memiliki halaman !"
        description="Tenang saja, kita siap membantu kamu memulainya dengan informasi konten
      halaman yang menakjubkan!"
      >
        <UButton v-if="isPagesDataEmpty" @click="createPageFirstStep">
          <template #leading>
            <NuxtIcon
              name="common/plus"
              class="text-lg text-white"
              aria-hidden="true"
            />
          </template>
          Membuat Halaman
        </UButton>
      </NoData>
    </div>
  </section>

  <PageModalChooseType
    :open="modal === 'CHOOSE_TYPE'"
    @next="createPageSecondStep"
    @close="closeModal"
  />

  <PageModalChooseTemplate
    :open="modal === 'CHOOSE_TEMPLATE'"
    @back="createPageFirstStep"
    @close="closeModal"
    @next="navigateToBuilder"
  />
</template>

<script setup lang="ts">
  import { IMetaData, IPageDataExtended } from '~/repository/j-site/types/page'

  definePageMeta({
    title: 'Halaman',
  })
  const { $jSiteApi } = useNuxtApp()
  const pageStore = usePageStore()
  const siteStore = useSiteStore()

  onMounted(() => {
    pageStore.$reset()
  })

  const pages = reactive({
    data: [] as IPageDataExtended[],
    meta: null as null | IMetaData,
  })

  // @todo: render this data to the template!
  const { data: pagesList } = await $jSiteApi.page.getPages(
    siteStore.siteId ?? '',
    undefined,
    {
      server: false,
    },
  )

  pages.data = toRaw(pagesList.value?.data ?? [])
  pages.meta = toRaw(pagesList.value?.meta ?? null)

  const isPagesDataEmpty = computed(() => {
    return Array.isArray(pages.data) && pages.data.length === 0
  })

  const MODAL_TYPES = {
    NONE: 'NONE',
    CHOOSE_TYPE: 'CHOOSE_TYPE',
    CHOOSE_TEMPLATE: 'CHOOSE_TEMPLATE',
  }

  const modal = ref<string>(MODAL_TYPES.NONE)

  function createPageFirstStep(): void {
    openChooseTypeModal()
  }

  function createPageSecondStep(): void {
    openChooseTemplateModal()
  }

  function closeModal(): void {
    modal.value = MODAL_TYPES.NONE
  }

  function openChooseTypeModal(): void {
    modal.value = MODAL_TYPES.CHOOSE_TYPE
  }

  function openChooseTemplateModal(): void {
    modal.value = MODAL_TYPES.CHOOSE_TEMPLATE
  }

  async function navigateToBuilder(): Promise<void> {
    await navigateTo({
      path: '/halaman/buat',
      query: {
        templateId: pageStore.builderConfig.templateId,
      },
    })
  }
</script>

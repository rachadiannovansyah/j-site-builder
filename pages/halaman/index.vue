<template>
  <div class="h-full w-full">
    <TabMenu v-if="route.path !== '/halaman/buat'" :tabs="PAGE_TAB_MENU" />
    <section
      class="flex h-fit w-full flex-col gap-4 rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
    >
      <div class="mb-8 flex items-start justify-between sm:flex-wrap">
        <div class="flex gap-8">
          <SearchBar
            placeholder="Cari Halaman"
            class="max-w-[181px]"
            @input="onSearch($event)"
          />
          <FilterBar />
        </div>
        <UButton
          v-if="!isPagesDataEmpty"
          data-cy="j-site-page__button-create-page"
          @click="createPageFirstStep"
        >
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
      <section
        v-if="loadingData"
        class="flex h-full w-full flex-col rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
      >
        <LoadingListSkeleton />
      </section>
      <section v-else>
        <div
          v-if="pages.data.length === 0"
          class="flex h-full w-full flex-col items-center justify-center"
        >
          <NoData
            title="Kamu belum memiliki halaman !"
            description="Tenang saja, kita siap membantu kamu memulainya dengan informasi konten
      halaman yang menakjubkan!"
          >
            <UButton
              data-cy="j-site-page__button-create-page"
              @click="createPageFirstStep"
            >
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

        <div v-else class="flow-root">
          <ul role="list" class="flex flex-col gap-3">
            <PageList :data="pages.data" />
          </ul>
          <BasePagination
            class="mt-4"
            :limit="params.limit"
            :total-rows="pages.meta?.total"
            :limit-options="['10', '15', '20']"
            :current-page="pages.meta?.page"
            :total-page="pages.meta?.last_page"
            @change-limit="setParamsLimit"
            @change-page="setParamsPage"
            @previous-page="onPreviousPage"
            @next-page="onNextPage"
          />
        </div>
      </section>
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
  </div>
</template>

<script setup lang="ts">
  import debounce from 'lodash.debounce'
  import { PAGE_TAB_MENU } from '~/common/constant/navigation'
  import { IMetaData, IPageDataExtended } from '~/repository/j-site/types/page'

  definePageMeta({
    title: 'Halaman',
  })

  const MODAL_TYPES = {
    NONE: 'NONE',
    CHOOSE_TYPE: 'CHOOSE_TYPE',
    CHOOSE_TEMPLATE: 'CHOOSE_TEMPLATE',
  }

  const modal = ref<string>(MODAL_TYPES.NONE)
  const { $jSiteApi } = useNuxtApp()
  const pageStore = usePageStore()
  const siteStore = useSiteStore()
  const route = useRoute()

  const pages = reactive({
    data: [] as IPageDataExtended[],
    meta: null as null | IMetaData,
  })

  const loadingData = ref(true)

  let params = reactive({
    page: 1 as string | number,
    limit: 10 as string | number,
    q: '' as string,
    status: '' as string,
  })

  onMounted(async () => {
    if (route.path === '/halaman') {
      await navigateTo({
        path: '/halaman',
        query: {
          type: 'semua',
        },
      })
    }

    pageStore.$reset()
  })

  watch(
    () => route.query?.type,
    (value) => {
      const findMenu = PAGE_TAB_MENU.find((menu) => {
        return menu.type === value
      })
      params.status = findMenu?.status || ''
      params.page = 1
      fetchDataPages()
    },
    { immediate: true },
  )

  async function fetchDataPages() {
    loadingData.value = true
    const { data: responseData } = await $jSiteApi.page.getPages(
      siteStore.siteId ?? '',
      { query: params },
      { server: false },
    )

    const pageData = toRaw(responseData.value?.data ?? [])
    const metaData = toRaw(responseData.value?.meta ?? null)

    // handle numbering on each page
    if (pageData.length > 0) {
      pages.data = pageData.map((item, index) => ({
        ...item,
        index: index + Number(metaData?.from),
      }))
    } else {
      pages.data = pageData
    }
    pages.meta = metaData
    loadingData.value = false
  }

  const isPagesDataEmpty = computed(() => {
    return Array.isArray(pages.data) && pages.data.length === 0
  })

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
        siteId: siteStore.siteId,
        templateId: pageStore.builderConfig.templateId,
        title: pageStore.builderConfig.type,
      },
    })
  }

  function setParamsLimit(limit: string | number) {
    params.limit = limit
    params.page = 1
    fetchDataPages()
  }

  function setParamsPage(page: string | number) {
    params.page = page
    fetchDataPages()
  }

  function onPreviousPage() {
    params.page = Number(params.page) - 1
    fetchDataPages()
  }

  function onNextPage() {
    params.page = Number(params.page) + 1
    fetchDataPages()
  }

  const onSearch = debounce((query: string) => {
    params.q = query
    params.page = 1
    fetchDataPages()
  }, 500)
</script>

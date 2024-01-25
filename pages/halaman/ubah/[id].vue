<template>
  <div class="h-full w-full bg-[#F3F4F8] pb-24">
    <PageBuilderHeader
      :loading="fetchSettingLoading"
      :is-edit-mode="true"
      @back="backToPage"
      @draft="toggleDraftModal"
      @publish="togglePublishModal"
      @update-published="toggleUpdatePublishedModal"
    />
    <div class="flex h-full w-full justify-between gap-4 px-1 py-4">
      <PageBuilderContent :loading="fetchPageLoading" />
      <PageBuilderAside />
    </div>
  </div>

  <!-- Confirmation Modal -->
  <BaseModal
    :open="
      modal.status === MODAL_STATE.STATUS_DRAFT ||
      modal.status === MODAL_STATE.STATUS_PUBLISH ||
      modal.status === MODAL_STATE.STATUS_PUBLISHED ||
      modal.status === MODAL_STATE.CANCEL_CONFIRMATION
    "
    button-position="right"
    :with-close-button="true"
    :modal-ui="{
      width: 'sm:max-w-[533px]',
    }"
    @close="onCancel"
  >
    <div class="justify-left flex items-start gap-4 pb-3">
      <div class="h-12 w-12 flex-none">
        <div
          :class="{
            'flex h-12 w-12 items-center justify-center rounded-full': true,
            'bg-green-50':
              modal.status === MODAL_STATE.STATUS_DRAFT ||
              modal.status === MODAL_STATE.STATUS_PUBLISHED,
            'bg-blue-50': modal.status === MODAL_STATE.STATUS_PUBLISH,
            'bg-[#FFF9E1]': modal.status === MODAL_STATE.CANCEL_CONFIRMATION,
          }"
        >
          <NuxtIcon
            :name="modal.icon"
            :class="{
              'text-2xl': true,
              'text-green-800':
                modal.status === MODAL_STATE.STATUS_DRAFT ||
                modal.status === MODAL_STATE.STATUS_PUBLISHED,
              'text-blue-800': modal.status === MODAL_STATE.STATUS_PUBLISH,
              'text-[#FFA600]':
                modal.status === MODAL_STATE.CANCEL_CONFIRMATION,
            }"
            aria-hidden="true"
          />
        </div>
      </div>
      <div class="h-full w-full grow flex-col">
        <h1
          class="font-roboto text-xl font-medium leading-7 text-gray-900"
          data-cy="page-builder__modal-title"
        >
          {{ modal.title }}
        </h1>
        <span
          class="font-lato text-sm leading-6 text-gray-600"
          data-cy="page-builder__modal-message"
        >
          {{ modal.message }}
        </span>
      </div>
    </div>
    <template #footer>
      <UButton
        v-if="modal.status === MODAL_STATE.CANCEL_CONFIRMATION"
        variant="outline"
        data-cy="page-builder__button-back-and-draft-page"
        @click="actionDraftPage()"
      >
        Kembali dan simpan draft
      </UButton>
      <NuxtLink
        v-if="modal.status === MODAL_STATE.CANCEL_CONFIRMATION"
        to="/halaman"
      >
        <UButton data-cy="page-builder__button-confirmation">
          Ya, saya yakin
        </UButton>
      </NuxtLink>
      <BaseButton
        v-if="modal.status !== MODAL_STATE.CANCEL_CONFIRMATION"
        variant="secondary"
        data-cy="page-builder__button-cancel"
        @click="onCancel"
      >
        Batalkan
      </BaseButton>
      <BaseButton
        v-if="modal.status === MODAL_STATE.STATUS_DRAFT"
        variant="primary"
        data-cy="page-builder__button-draft-page"
        @click="actionDraftPage()"
      >
        Iya, saya yakin
      </BaseButton>
      <BaseButton
        v-if="
          modal.status === MODAL_STATE.STATUS_PUBLISH ||
          modal.status === MODAL_STATE.STATUS_PUBLISHED
        "
        variant="primary"
        data-cy="page-builder__button-publish-page"
        @click="actionPublishPage()"
      >
        Iya, saya yakin
      </BaseButton>
    </template>
  </BaseModal>

  <!-- Action Progress -->
  <ProgressModal
    :open="modal.status === MODAL_STATE.LOADING"
    :value="loadingProgressValue"
    :title="modal.title"
    :message="modal.message"
  />

  <!-- Error / Success Modal -->
  <BaseModal
    :open="
      modal.status === MODAL_STATE.SUCCESS || modal.status === MODAL_STATE.ERROR
    "
    :header="modal.title"
    button-position="center"
    :with-close-button="true"
    :modal-ui="{
      width: 'sm:max-w-[533px]',
    }"
    @close="onCancel"
  >
    <div class="flex items-center justify-center gap-2">
      <div class="flex h-full w-[18px] items-center justify-center">
        <NuxtIcon
          v-if="modal.status === MODAL_STATE.SUCCESS"
          name="common/check-circle"
          class="text-base text-green-700"
          aria-hidden="true"
        />
        <NuxtIcon
          v-else
          name="common/warning-triangle"
          class="text-base text-red-600"
          aria-hidden="true"
        />
      </div>
      <div class="h-full w-full grow flex-col">
        <p
          class="font-lato text-sm leading-6 text-gray-600"
          data-cy="page-builder__modal-message"
        >
          {{ modal.message }}
        </p>
      </div>
    </div>
    <template #footer>
      <BaseButton
        variant="primary"
        data-cy="page-builder__button-store-page"
        @click="onSuccessStorePage"
      >
        Saya Mengerti
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { MODAL_STATE } from '~/common/constant/modal'
  import aes from 'crypto-js/aes'
  import { format } from 'date-fns'
  import ID from 'date-fns/locale/id'

  definePageMeta({
    layout: 'full-bleed',
  })

  const config = useRuntimeConfig()
  const pageStore = usePageStore()
  const siteStore = useSiteStore()
  const { $jSiteApi } = useNuxtApp()
  const route = useRoute()

  const modal = reactive({
    status: '',
    icon: '',
    title: '',
    message: '',
  })

  const loadingProgressValue = ref(0)
  const fetchPageLoading = ref(true)

  const pageId = route.params.id.toString()

  const { data: setting, pending: fetchSettingLoading } =
    await $jSiteApi.settings.getSettingsById(
      siteStore?.siteId ?? '',
      undefined, // no query params for this request
      { server: false, lazy: true },
    )

  watch(setting, () => {
    pageStore.setPageDomain(toRaw(setting.value?.data?.domain || ''))
  })

  async function setInitialData() {
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
        const { category, title, status, updated_at, sections } = data || {}

        pageStore.setPageisEdit(true)
        pageStore.setPageCategory(category)
        pageStore.setPageTitle(title ?? '')
        pageStore.setPageStatus(status ?? '')
        pageStore.setPageLastUpdate(updated_at ? formatDate(updated_at) : '')
        pageStore.setBuilderSections(sections ?? [])
        pageStore.initializeBuilderData()
      }
    }

    if (status.value === 'error') {
      console.error(error)
    }

    fetchPageLoading.value = pending.value
  }

  function generatePageToken() {
    if (!pageStore.builderConfig.pageToken) {
      const pageToken = aes
        .encrypt(new Date().toString(), config.public.pageTokenSecret)
        .toString()

      pageStore.setPageToken(pageToken)
    }
  }

  onMounted(() => {
    setInitialData()
    generatePageToken()
    window.addEventListener('beforeunload', beforeUnloadHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler)
    pageStore.$reset()
  })

  const statusPage = computed(() => {
    return pageStore.builderConfig.status?.toString()
  })

  function beforeUnloadHandler(event: Event) {
    event.preventDefault()
  }

  function formatDate(date: string) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ID })
  }

  function onCancel() {
    modal.status = MODAL_STATE.NONE
  }

  function setLoadingProgress(value: number) {
    loadingProgressValue.value = value
  }

  async function onSuccessStorePage() {
    await navigateTo({ path: '/halaman?type=semua' })
  }

  function backToPage() {
    modal.status = MODAL_STATE.CANCEL_CONFIRMATION
    modal.icon = 'common/warning-triangle'
    modal.title = 'Keluar Halaman Builder'
    modal.message =
      'Apakah anda yakin untuk kembali ke menu halaman? Jika anda kembali ke menu halaman tanpa menyimpan, maka pengaturan anda lakukan sebelumnya dapat hilang atau dihapus.'
  }

  function toggleDraftModal() {
    modal.status = MODAL_STATE.STATUS_DRAFT
    modal.icon = 'navigation/posting-menu-icon'
    modal.title = 'Simpan ke draft'
    modal.message = 'Apakah anda yakin ingin Menyimpan ke Draft ?'
  }

  function togglePublishModal() {
    modal.status = MODAL_STATE.STATUS_PUBLISH
    modal.icon = 'common/plane'
    modal.title = 'Terbitkan Halaman'
    modal.message = 'Apakah anda yakin ingin Menerbitkan Halaman ?'
  }

  function toggleUpdatePublishedModal() {
    modal.status = MODAL_STATE.STATUS_PUBLISHED
    modal.icon = 'navigation/posting-menu-icon'
    modal.title = 'Perbarui Data'
    modal.message = 'Apakah anda yakin ingin Memperbarui data ?'
  }

  async function actionDraftPage() {
    modal.status = MODAL_STATE.LOADING
    modal.title = 'Menyimpan ke draft'
    modal.message = 'Mohon tunggu, penyimpanan Halaman sedang diproses.'

    const { status } = await $jSiteApi.page.updatePage(
      siteStore?.siteId ?? '',
      pageId ?? '',
      pageStore.generatePageData({ status: 'DRAFT' }),
      { server: false },
    )

    if (status.value === 'success') {
      setLoadingProgress(25)
      setTimeout(() => {
        setLoadingProgress(100)
        setTimeout(() => {
          modal.status = MODAL_STATE.SUCCESS
          modal.title = 'Berhasil!'
          modal.message = 'Halaman yang Anda buat berhasil disimpan ke draft.'
        }, 250)
      }, 250)
    } else if (status.value === 'error') {
      modal.status = MODAL_STATE.ERROR
      modal.title = 'Gagal!'
      modal.message = 'Halaman yang Anda buat gagal disimpan ke draft.'
    }
  }

  async function actionPublishPage() {
    modal.status = MODAL_STATE.LOADING
    if (statusPage.value === 'PUBLISHED') {
      modal.title = 'Memperbarui Data'
      modal.message = 'Mohon tunggu, mempembarui data Halaman sedang diproses.'
    } else {
      modal.title = 'Menerbitkan Halaman'
      modal.message = 'Mohon tunggu, penerbitan Halaman sedang diproses.'
    }

    const { status } = await $jSiteApi.page.updatePage(
      siteStore?.siteId ?? '',
      pageId ?? '',
      pageStore.generatePageData({ status: 'PUBLISHED' }),
      { server: false },
    )

    if (status.value === 'success') {
      setLoadingProgress(25)
      setTimeout(() => {
        setLoadingProgress(100)
        setTimeout(() => {
          modal.status = MODAL_STATE.SUCCESS
          modal.title = 'Berhasil!'
          if (statusPage.value === 'PUBLISHED') {
            modal.message = 'Halaman Anda berhasil diperbarui.'
          } else {
            modal.message = 'Halaman yang Anda buat berhasil diterbitkan.'
          }
        }, 250)
      }, 250)
    } else if (status.value === 'error') {
      modal.status = MODAL_STATE.ERROR
      modal.title = 'Gagal!'
      modal.message = 'Halaman yang Anda buat gagal disimpan ke draft.'
    }
  }
</script>

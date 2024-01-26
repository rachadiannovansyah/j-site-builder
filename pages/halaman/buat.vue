<template>
  <div class="h-full w-full bg-[#F3F4F8] pb-24">
    <PageBuilderHeader
      :loading="fetchSettingLoading"
      @back="backToPage"
      @draft="toggleDraftModal"
      @publish="togglePublishModal"
      @preview="handlePreview"
    />
    <div class="flex h-full w-full justify-between gap-4 px-1 py-4">
      <PageBuilderContent :loading="fetchTemplateLoading" />
      <PageBuilderAside />
    </div>
  </div>

  <!-- Confirmation Modal -->
  <BaseModal
    :open="
      modal.status === MODAL_STATE.STATUS_DRAFT ||
      modal.status === MODAL_STATE.STATUS_PUBLISH ||
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
            'bg-green-50': modal.status === MODAL_STATE.STATUS_DRAFT,
            'bg-blue-50': modal.status === MODAL_STATE.STATUS_PUBLISH,
            'bg-[#FFF9E1]': modal.status === MODAL_STATE.CANCEL_CONFIRMATION,
          }"
        >
          <NuxtIcon
            :name="modal.icon"
            :class="{
              'text-2xl': true,
              'text-green-800': modal.status === MODAL_STATE.STATUS_DRAFT,
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
        @click="actionDraftPage"
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
        v-if="modal.status === MODAL_STATE.STATUS_PUBLISH"
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

  definePageMeta({
    layout: 'full-bleed',
  })

  onMounted(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler)
    generatePageToken()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler)
  })

  const config = useRuntimeConfig()

  function generatePageToken() {
    if (!pageStore.builderConfig.pageToken) {
      const pageToken = aes
        .encrypt(new Date().toString(), config.public.pageTokenSecret)
        .toString()

      pageStore.setPageToken(pageToken)
    }
  }

  function beforeUnloadHandler(event: Event) {
    event.preventDefault()
  }

  const modal = reactive({
    status: '',
    icon: '',
    title: '',
    message: '',
  })

  const loadingProgressValue = ref(0)

  const { $jSiteApi } = useNuxtApp()
  const route = useRoute()
  const siteStore = useSiteStore()
  const pageStore = usePageStore()

  pageStore.setPageTitle(route.query.title?.toString() ?? '')
  pageStore.setPageTemplate(route.query.templateId?.toString() ?? '')

  const { data: setting, pending: fetchSettingLoading } =
    await $jSiteApi.settings.getSettingsById(
      siteStore?.siteId ?? '',
      undefined, // no query params for this request
      { server: false, lazy: true },
    )

  watch(setting, () => {
    pageStore.setPageDomain(toRaw(setting.value?.data?.domain || ''))
  })

  const { data: template, pending: fetchTemplateLoading } =
    await $jSiteApi.templates.getTemplateById(
      pageStore.builderConfig?.templateId ?? '',
      undefined, // no query params for this request
      { server: false, lazy: true },
    )

  watch(template, () => {
    pageStore.setBuilderSections(toRaw(template.value?.data?.sections || []))
    pageStore.setPageCategory(toRaw(template.value?.data?.category || ''))
  })

  const backToPage = () => {
    modal.status = MODAL_STATE.CANCEL_CONFIRMATION
    modal.icon = 'common/warning-triangle'
    modal.title = 'Keluar Halaman Builder'
    modal.message =
      'Apakah anda yakin untuk kembali ke menu halaman? Jika anda kembali ke menu halaman tanpa menyimpan, maka pengaturan anda lakukan sebelumnya dapat hilang atau dihapus.'
  }

  const toggleDraftModal = () => {
    modal.status = MODAL_STATE.STATUS_DRAFT
    modal.icon = 'navigation/posting-menu-icon'
    modal.title = 'Simpan ke draft'
    modal.message = 'Apakah anda yakin ingin Menyimpan ke Draft ?'
  }

  const togglePublishModal = () => {
    modal.status = MODAL_STATE.STATUS_PUBLISH
    modal.icon = 'common/plane'
    modal.title = 'Terbitkan Halaman'
    modal.message = 'Apakah anda yakin ingin Menerbitkan Halaman ?'
  }

  const onCancel = () => {
    modal.status = MODAL_STATE.NONE
  }

  const onSuccessStorePage = async () => {
    await navigateTo({ path: '/halaman' })
  }

  const setLoadingProgress = (value: number) => {
    loadingProgressValue.value = value
  }

  const actionDraftPage = async () => {
    modal.status = MODAL_STATE.LOADING
    modal.title = 'Menyimpan ke draft'
    modal.message = 'Mohon tunggu, penyimpanan Halaman sedang diproses.'

    const { status } = await $jSiteApi.page.storePage(
      siteStore?.siteId ?? '',
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

  const actionPublishPage = async () => {
    modal.status = MODAL_STATE.LOADING
    modal.title = 'Menerbitkan Halaman'
    modal.message = 'Mohon tunggu, penerbitan Halaman sedang diproses.'

    const { status } = await $jSiteApi.page.storePage(
      siteStore?.siteId ?? '',
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
          modal.message = 'Halaman yang Anda buat berhasil diterbitkan.'
        }, 250)
      }, 250)
    } else if (status.value === 'error') {
      modal.status = MODAL_STATE.ERROR
      modal.title = 'Gagal!'
      modal.message = 'Halaman yang Anda buat gagal diterbitkan.'
    }
  }

  async function handlePreview() {
    const body = pageStore.generatePageData({ status: 'DRAFT' })
    const { data, status, error } = await $jSiteApi.page.storePreview(
      siteStore.siteId ?? '',
      body,
      { server: false },
    )

    if (status.value === 'success' && data.value) {
      const { preview_link: previewLink } = data.value
      openPreviewOnNewTab(previewLink)
    }

    if (status.value === 'error') {
      modal.status = MODAL_STATE.ERROR
      modal.title = 'Gagal!'
      modal.message =
        'Mohon maaf, gagal menampilkan preview. Mohon coba beberapa saat lagi'

      console.error(error)
    }
  }

  const windowObjectReference = ref<Window | null>(null)

  function openPreviewOnNewTab(url: string) {
    if (
      windowObjectReference.value === null ||
      windowObjectReference.value?.closed
    ) {
      windowObjectReference.value = window.open(url, 'j-site-preview')
    } else {
      windowObjectReference.value.focus()
    }
  }
</script>

<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-[#F3F4F8]">
    <PageHeaderCreate
      :site-name="state.domain"
      @back="backToPage"
      @draft="toggleDraftModal"
      @publish="togglePublishModal"
    />
    <div
      class="mb-4 flex h-full w-full justify-between gap-4 overflow-y-auto px-1 py-4"
    >
      <PageContentCreate :data="data.sections" />
      <PageAsideCreate :title="data.type" @update="onUpdateTitle($event)" />
    </div>
  </div>

  <!-- Confirmation Modal -->
  <BaseModal
    :open="
      state.modal.status === MODAL_STATE.STATUS_DRAFT ||
      state.modal.status === MODAL_STATE.STATUS_PUBLISH ||
      state.modal.status === MODAL_STATE.CANCEL_CONFIRMATION
    "
    :with-close-button="true"
    max-width="max-w-[533px]"
    @close="onCancel"
  >
    <ModalBody class="px-8 pb-7 pt-[50px]">
      <div class="justify-left flex items-start gap-4">
        <div class="h-12 w-12 flex-none">
          <div
            :class="{
              'flex h-12 w-12 items-center justify-center rounded-full': true,
              'bg-green-50': state.modal.status === MODAL_STATE.STATUS_DRAFT,
              'bg-blue-50': state.modal.status === MODAL_STATE.STATUS_PUBLISH,
              'bg-[#FFF9E1]':
                state.modal.status === MODAL_STATE.CANCEL_CONFIRMATION,
            }"
          >
            <NuxtIcon
              :name="state.modal.icon"
              :class="{
                'text-2xl': true,
                'text-green-800':
                  state.modal.status === MODAL_STATE.STATUS_DRAFT,
                'text-blue-800':
                  state.modal.status === MODAL_STATE.STATUS_PUBLISH,
                'text-[#FFA600]':
                  state.modal.status === MODAL_STATE.CANCEL_CONFIRMATION,
              }"
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="h-full w-full grow flex-col">
          <h1 class="font-roboto text-xl font-medium leading-7 text-gray-900">
            {{ state.modal.title }}
          </h1>
          <span class="font-lato text-sm leading-6 text-gray-600">
            {{ state.modal.message }}
          </span>
        </div>
      </div>
    </ModalBody>
    <ModalFooter
      v-if="state.modal.status === MODAL_STATE.CANCEL_CONFIRMATION"
      position="right"
    >
      <BaseButton
        class="border-[#E0E0E0] text-[#757575]"
        variant="secondary"
        @click="onCancel"
      >
        Kembali dan simpan draft
      </BaseButton>
      <NuxtLink to="/halaman">
        <BaseButton variant="primary"> Iya, saya yakin </BaseButton></NuxtLink
      >
    </ModalFooter>
    <ModalFooter v-else position="right">
      <BaseButton variant="secondary" @click="onCancel"> Batalkan </BaseButton>
      <BaseButton
        v-if="state.modal.status === MODAL_STATE.STATUS_DRAFT"
        variant="primary"
        @click="actionDraftPage()"
      >
        Iya, saya yakin
      </BaseButton>
      <BaseButton
        v-if="state.modal.status === MODAL_STATE.STATUS_PUBLISH"
        variant="primary"
        @click="actionPublishPage()"
      >
        Iya, saya yakin
      </BaseButton>
    </ModalFooter>
  </BaseModal>

  <!-- Action Progress -->
  <ProgressModal
    :open="state.modal.status === MODAL_STATE.LOADING"
    :value="state.loading.progressValue"
    :title="state.loading.title"
    :message="state.loading.message"
  />

  <!-- Error / Success Modal -->
  <BaseModal
    :open="
      state.modal.status === MODAL_STATE.SUCCESS ||
      state.modal.status === MODAL_STATE.ERROR
    "
    max-width="max-w-[533px]"
    @close="onCancel"
  >
    <ModalTitle class="flex justify-between">
      {{ state.modal.title }}
    </ModalTitle>
    <ModalBody class="p-6">
      <div class="flex items-center justify-center gap-2">
        <div class="flex h-full w-[18px] items-center justify-center">
          <NuxtIcon
            v-if="state.modal.status === MODAL_STATE.SUCCESS"
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
          <p class="font-lato text-sm leading-6 text-gray-600">
            {{ state.modal.message }}
          </p>
        </div>
      </div>
    </ModalBody>
    <ModalFooter position="center">
      <BaseButton variant="primary" @click="onSuccessStorePage">
        Saya Mengerti
      </BaseButton>
    </ModalFooter>
  </BaseModal>
</template>

<script setup lang="ts">
  import { MODAL_STATE } from '~/common/constant/modal'

  definePageMeta({
    layout: 'public',
  })

  const state = reactive({
    siteId: '',
    params: {
      title: '',
      status: '',
      sections: [],
    },
    domain: '',
    modal: {
      status: '',
      icon: '',
      title: '',
      message: '',
    },
    loading: {
      progressValue: 0,
      title: '',
      message: '',
    },
  })

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()
  state.siteId = siteStore.siteId || ''

  const pageStore = usePageStore()
  const data = JSON.parse(JSON.stringify(pageStore.page))
  state.params.sections = data.sections

  onMounted(() => {
    getSiteDetail()
    state.params.title = data.type
  })

  const getSiteDetail = async () => {
    try {
      const { data } = await $jSiteApi.settings.getSettingsById(
        state.siteId,
        undefined, // no query params for this request
        { server: false },
      )
      const { data: siteData } = JSON.parse(JSON.stringify(data.value))
      state.domain = siteData.domain
    } catch (error) {}
  }

  const backToPage = () => {
    state.modal.status = MODAL_STATE.CANCEL_CONFIRMATION
    state.modal.icon = 'common/warning-triangle'
    state.modal.title = 'Keluar Halaman Builder'
    state.modal.message =
      'Apakah anda yakin untuk kembali ke menu halaman? Jika anda kembali ke menu halaman tanpa menyimpan, maka pengaturan anda lakukan sebelumnya dapat hilang atau dihapus.'
  }

  const toggleDraftModal = () => {
    state.modal.status = MODAL_STATE.STATUS_DRAFT
    state.modal.icon = 'navigation/posting-menu-icon'
    state.modal.title = 'Simpan ke draft'
    state.modal.message = 'Apakah anda yakin ingin Menyimpan ke Draft ?'
  }

  const togglePublishModal = () => {
    state.modal.status = MODAL_STATE.STATUS_PUBLISH
    state.modal.icon = 'common/plane'
    state.modal.title = 'Terbitkan Halaman'
    state.modal.message = 'Apakah anda yakin ingin Menerbitkan Halaman ?'
  }

  const onCancel = () => {
    state.modal.status = MODAL_STATE.NONE
  }

  const onSuccessStorePage = async () => {
    await navigateTo({ path: '/halaman/semua' })
  }

  const actionDraftPage = async () => {
    state.params.status = MODAL_STATE.STATUS_DRAFT
    state.modal.status = MODAL_STATE.LOADING
    state.loading.title = 'Menyimpan ke draft'
    state.loading.message = 'Mohon tunggu, penyimpanan Halaman sedang diproses.'

    const response = await $jSiteApi.page.storePage(
      state.siteId,
      JSON.parse(JSON.stringify(state.params)),
      { server: false },
    )

    const { status, error } = response
    if (status.value === 'success') {
      state.loading.progressValue = 25
      setTimeout(() => {
        state.loading.progressValue = 100
        setTimeout(() => {
          state.modal.status = MODAL_STATE.SUCCESS
          state.modal.title = 'Berhasil!'
          state.modal.message =
            'Halaman yang Anda buat berhasil disimpan ke draft.'
        }, 250)
      }, 250)
    } else {
      const { data } = JSON.parse(JSON.stringify(error.value))
      state.modal.status = MODAL_STATE.ERROR
      state.modal.title = 'Gagal!'
      state.modal.message =
        data?.error || 'Halaman yang Anda buat gagal disimpan ke draft.'
    }
  }

  const actionPublishPage = async () => {
    state.params.status = MODAL_STATE.STATUS_PUBLISH
    state.modal.status = MODAL_STATE.LOADING
    state.loading.title = 'Menerbitkan Halaman'
    state.loading.message = 'Mohon tunggu, penerbitan Halaman sedang diproses.'

    const response = await $jSiteApi.page.storePage(
      state.siteId,
      JSON.parse(JSON.stringify(state.params)),
      { server: false },
    )

    const { status, error } = response
    if (status.value === 'success') {
      state.loading.progressValue = 25
      setTimeout(() => {
        state.loading.progressValue = 100
        setTimeout(() => {
          state.modal.status = MODAL_STATE.SUCCESS
          state.modal.title = 'Berhasil!'
          state.modal.message = 'Halaman yang Anda buat berhasil diterbitkan.'
        }, 250)
      }, 250)
    } else {
      const { data } = JSON.parse(JSON.stringify(error.value))
      state.modal.status = MODAL_STATE.ERROR
      state.modal.title = 'Gagal!'
      state.modal.message =
        data?.error ||
        data?.errors ||
        'Halaman yang Anda buat gagal diterbitkan.'
    }
  }

  const onUpdateTitle = (value: string) => {
    state.params.title = value
  }
</script>

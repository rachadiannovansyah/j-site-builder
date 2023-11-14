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
      <PageAsideCreate />
    </div>
  </div>

  <!-- Draft Confirmation Modal -->
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
        variant="primary"
        @click="
          state.modal.status === MODAL_STATE.STATUS_DRAFT
            ? actionDraftPage()
            : actionPublishPage()
        "
      >
        Iya, saya yakin
      </BaseButton>
    </ModalFooter>
  </BaseModal>
</template>

<script setup lang="ts">
  import { MODAL_STATE } from '~/common/constant/modal'

  definePageMeta({
    layout: 'public',
  })

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()
  const pageStore = usePageStore()
  const data = JSON.parse(JSON.stringify(pageStore.page))

  const state = reactive({
    domain: '',
    modal: {
      status: '',
      icon: '',
      title: '',
      message: '',
    },
    loading: false,
    progressValue: 0,
  })

  onMounted(() => {
    getSiteDetail()
  })

  const getSiteDetail = async () => {
    const siteId = siteStore.siteId || ''

    try {
      const { data } = await $jSiteApi.settings.getSettingsById(
        siteId,
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
    state.loading = false
    state.modal.status = MODAL_STATE.NONE
  }

  const actionDraftPage = () => {
    console.log('draft page')
  }

  const actionPublishPage = () => {
    console.log('publish page')
  }
</script>

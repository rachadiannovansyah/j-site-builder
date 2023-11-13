<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-[#F3F4F8]">
    <PageHeaderCreate
      :site-name="state.subdomain"
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
      state.modal.status === MODAL_STATE.STATUS_PUBLISH
    "
    :with-close-button="true"
    max-width="max-w-[533px]"
    @close="onCancel"
  >
    <ModalBody class="px-8 pb-7 pt-[50px]">
      <div class="flex items-center gap-4">
        <div
          :class="{
            'flex h-12 w-12 items-center justify-center rounded-full': true,
            'bg-green-50': state.modal.status === MODAL_STATE.STATUS_DRAFT,
            'bg-blue-50': state.modal.status === MODAL_STATE.STATUS_PUBLISH,
          }"
        >
          <NuxtIcon
            :name="state.modal.icon"
            :class="{
              '-mb-2 text-2xl': true,
              'text-green-800': state.modal.status === MODAL_STATE.STATUS_DRAFT,
              'text-blue-800':
                state.modal.status === MODAL_STATE.STATUS_PUBLISH,
            }"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1 class="font-roboto text-xl font-medium leading-7 text-gray-900">
            {{ state.modal.title }}
          </h1>
          <span class="font-lato text-sm leading-6 text-gray-600">
            {{ state.modal.message }}
          </span>
        </div>
      </div>
    </ModalBody>
    <ModalFooter position="right">
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
    subdomain: '',
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
    console.log(siteId)
    try {
      const { data } = await $jSiteApi.settings.getSettingsById(
        siteId,
        undefined, // no query params for this request
        { server: false },
      )
      const { data: siteData } = JSON.parse(JSON.stringify(data.value))
      state.subdomain = siteData.subdomain
    } catch (error) {}
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

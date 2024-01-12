<template>
  <PostForm @submit-form="openPublishConfirmation">
    <template #header="{ valid }">
      <nav class="mb-[14px] flex items-center justify-between py-[14px]">
        <UButton variant="outline" @click="goBack">
          <template #leading>
            <NuxtIcon
              name="common/arrow-left"
              aria-hidden="true"
              class="text-xl"
            />
          </template>
          Kembali
        </UButton>

        <div class="flex gap-x-[14px]">
          <UButton
            variant="outline"
            type="button"
            @click="openSaveAsDraftConfirmation"
          >
            <template #leading>
              <NuxtIcon
                name="common/folder"
                aria-hidden="true"
                class="text-xl"
              />
            </template>
            Simpan ke Draft
          </UButton>
          <UButton type="submit" :disabled="!valid">
            <template #leading>
              <NuxtIcon name="common/file" aria-hidden="true" class="text-xl" />
            </template>
            Terbitkan Post
          </UButton>
        </div>
      </nav>
    </template>
  </PostForm>

  <!-- Confirmation Modal for Save as Draft and Publish -->
  <BaseModal
    :open="modal.status === 'SAVE_AS_DRAFT' || modal.status === 'PUBLISH'"
    :header="modal.title"
    button-position="right"
  >
    <p class="text-md mb-4 font-lato leading-6 text-gray-700">
      {{ modal.message }}
    </p>
    <template #footer>
      <UButton variant="outline" type="button" @click="closeModal">
        Batal
      </UButton>
      <UButton
        v-show="modal.status === 'SAVE_AS_DRAFT'"
        type="button"
        @click="saveAsDraft"
      >
        Ya, simpan ke draf
      </UButton>
      <UButton v-show="modal.status === 'PUBLISH'" type="button">
        Ya, simpan post
      </UButton>
    </template>
  </BaseModal>

  <!-- Submit Progress -->
  <ProgressModal
    :open="modal.status === 'LOADING'"
    :value="modal.progress ?? 0"
    :title="modal.title"
    :message="modal.message"
  />

  <!-- Success/Error Confirmation -->
  <BaseModal
    :open="modal.status === 'SUCCESS' || modal.status === 'ERROR'"
    :header="modal.title"
    button-position="center"
  >
    <p class="mb-4 flex items-center">
      <NuxtIcon
        v-show="modal.status === 'SUCCESS'"
        name="common/check-circle"
        class="mr-3 inline-block text-xl text-green-500"
        aria-hidden="true"
      />
      <NuxtIcon
        v-show="modal.status === 'ERROR'"
        name="common/warning-triangle"
        class="mr-3 inline-block text-xl text-yellow-500"
        aria-hidden="true"
      />
      <span class="text-md font-lato leading-6 text-gray-700">
        {{ modal.message }}
      </span>
    </p>
    <template #footer>
      <UButton
        v-show="modal.status === 'ERROR'"
        type="button"
        @click="closeModal"
      >
        Saya Mengerti
      </UButton>

      <UButton
        v-show="modal.status === 'SUCCESS'"
        type="button"
        @click="navigateTo('/posting')"
      >
        Saya Mengerti
      </UButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Posting',
  })

  const postStore = usePostStore()
  const siteStore = useSiteStore()
  const { $jSiteApi } = useNuxtApp()

  interface IModalConfirmation {
    status:
      | 'NONE'
      | 'SAVE_AS_DRAFT'
      | 'PUBLISH'
      | 'LOADING'
      | 'SUCCESS'
      | 'ERROR'
    title: string
    message: string
    progress?: number
  }

  const modal = reactive<IModalConfirmation>({
    status: 'NONE',
    title: '',
    message: '',
    progress: 0,
  })

  function setModal({ status, title, message }: IModalConfirmation) {
    modal.status = status
    modal.title = title
    modal.message = message
  }

  function openSaveAsDraftConfirmation() {
    setModal({
      status: 'SAVE_AS_DRAFT',
      title: 'Simpan ke Draf',
      message: 'Apakah Anda ingin menyimpan Post ini ke draf?',
    })
  }

  function openPublishConfirmation() {
    setModal({
      status: 'PUBLISH',
      title: 'Simpan Post',
      message: 'Apakah Anda ingin menyimpan Post ini?',
    })
  }

  function closeModal() {
    modal.status = 'NONE'

    setTimeout(() => {
      resetModal()
    }, 300)
  }

  function resetModal() {
    modal.title = ''
    modal.message = ''
    modal.progress = 0
  }

  function setSubmitProgress(value: number) {
    modal.progress = value
  }

  async function saveAsDraft() {
    const body = postStore.generateFormData({ status: 'DRAFT' })

    if (!body.title) {
      setModal({
        status: 'ERROR',
        title: 'Terjadi Kesalahan',
        message: 'Silakan memasukkan judul post terlebih dahulu',
      })

      return
    }

    setSubmitProgress(50)
    setModal({
      status: 'LOADING',
      title: 'Simpan ke Draf',
      message: 'Mohon tunggu, penyimpanan post ke Draf sedang diproses.',
    })

    const { status, error } = await $jSiteApi.post.createPost(
      siteStore.siteId ?? '',
      body,
      { server: false },
    )

    if (status.value === 'success') {
      setSubmitProgress(100)

      setTimeout(() => {
        setModal({
          status: 'SUCCESS',
          title: 'Berhasil Simpan ke Draf',
          message: 'Post yang Anda submit berhasil disimpan ke Draf',
        })
      }, 500)
    }

    if (status.value === 'error') {
      setTimeout(() => {
        setModal({
          status: 'ERROR',
          title: 'Gagal Simpan ke Draf',
          message:
            'Mohon maaf, post yang Anda submit gagal disimpan. Mohon coba beberapa saat lagi.',
        })
      }, 500)

      console.error(error)
    }
  }

  function goBack() {
    // TODO: handle router go back
  }
</script>

<template>
  <PostForm @submit-form="openUpdateConfirmation">
    <template #header="{ valid }">
      <nav class="mb-[14px] flex items-center justify-between py-[14px]">
        <UButton variant="outline" @click="handleGoBack">
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
            v-if="postStore.form.status === 'DRAFT'"
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
          <UButton type="submit" :disabled="!valid || !isPostModified">
            <template #leading>
              <NuxtIcon name="common/file" aria-hidden="true" class="text-xl" />
            </template>
            Perbaharui Post
          </UButton>
        </div>
      </nav>
    </template>
  </PostForm>

  <!-- Confirmation Modal for Save as Draft and Update -->
  <BaseModal
    :open="modal.status === 'SAVE_AS_DRAFT' || modal.status === 'UPDATE'"
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
      <UButton
        v-show="modal.status === 'UPDATE'"
        type="button"
        @click="updatePost"
      >
        Ya, perbaharui post
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
    :open="
      modal.status === 'SUCCESS' ||
      modal.status === 'ERROR' ||
      modal.status === 'NOT_FOUND'
    "
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
        v-show="modal.status === 'ERROR' || modal.status === 'NOT_FOUND'"
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
        v-show="modal.status === 'NOT_FOUND'"
        type="button"
        @click="navigateTo('/posting')"
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

  <!-- Exit/Leave Confirmation -->
  <BaseModal
    :open="modal.status === 'LEAVING'"
    :header="modal.title"
    button-position="center"
  >
    <p class="mb-4 flex items-center">
      <NuxtIcon
        name="common/warning-triangle"
        class="mr-3 inline-block text-xl text-yellow-500"
        aria-hidden="true"
      />
      <span class="text-md font-lato leading-6 text-gray-700">
        {{ modal.message }}
      </span>
    </p>
    <template #footer>
      <UButton variant="outline" type="button" @click="closeModal">
        Batal
      </UButton>
      <UButton type="button" @click="navigateTo('/posting')">
        Ya, batalkan perubahan
      </UButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { IPostResponse } from '~/repository/j-site/types/post'
  import isEqual from 'lodash.isequal'
  import debounce from 'lodash.debounce'

  definePageMeta({
    title: 'Posting',
  })

  const postStore = usePostStore()
  const siteStore = useSiteStore()
  const { $jSiteApi } = useNuxtApp()
  const route = useRoute()

  async function setInitialData() {
    const postId = route.params.id.toString()

    const {
      data: postData,
      status,
      error,
    } = await $jSiteApi.post.getPostById(siteStore?.siteId ?? '', postId)

    if (status.value === 'success') {
      if (postData.value) {
        postStore.setInitialData(postData.value)
        setOriginalPost(postData.value)
      }
    }

    if (status.value === 'error') {
      setModal({
        status: 'NOT_FOUND',
        title: 'Gagal Mendapatkan Data Post',
        message:
          'Mohon maaf, gagal mendapatkan data post. Silakan coba beberapa saat lagi.',
      })
      console.error(error)
    }
  }

  onMounted(() => {
    setInitialData()
    window.addEventListener('beforeunload', beforeUnloadHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler)
    postStore.$reset()
  })

  function beforeUnloadHandler(event: Event) {
    event.preventDefault()
  }

  const originalPost = {
    title: '',
    image: {
      id: '',
      uri: '',
      filename: '',
    },
    content: '',
    author: '',
    category: '',
    tags: [''],
    status: '',
  }

  const isPostModified = ref(false)

  function setOriginalPost(postData: IPostResponse) {
    originalPost.title = postData.data.title
    originalPost.image.id = postData.data.image.id
    originalPost.image.uri = postData.data.image.uri
    originalPost.image.filename = postData.data.image.originalname
    originalPost.content = postData.data.content
    originalPost.author = postData.data.author
    originalPost.category = postData.data.category.id
    originalPost.tags = [...postData.data.tags]
    originalPost.status = postData.data.status
  }

  interface IModalConfirmation {
    status:
      | 'NONE'
      | 'SAVE_AS_DRAFT'
      | 'UPDATE'
      | 'LOADING'
      | 'SUCCESS'
      | 'ERROR'
      | 'NOT_FOUND'
      | 'LEAVING'
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

  function openUpdateConfirmation() {
    setModal({
      status: 'UPDATE',
      title: 'Perbaharui Post',
      message: 'Apakah Anda ingin memperbaharui Post ini?',
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
    const postId = route.params.id.toString()
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

    const { status, error } = await $jSiteApi.post.updatePost(
      siteStore.siteId ?? '',
      postId,
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

  async function updatePost() {
    const postId = route.params.id.toString()
    const body = postStore.generateFormData({ status: 'PUBLISHED' })

    setSubmitProgress(50)
    setModal({
      status: 'LOADING',
      title: 'Memperbaharui Post',
      message: 'Mohon tunggu, penyimpanan post sedang diproses.',
    })

    const { status, error } = await $jSiteApi.post.updatePost(
      siteStore.siteId ?? '',
      postId,
      body,
      { server: false },
    )

    if (status.value === 'success') {
      setSubmitProgress(100)

      setTimeout(() => {
        setModal({
          status: 'SUCCESS',
          title: 'Berhasil!',
          message: 'Post yang Anda perbaharui berhasil disimpan.',
        })
      }, 500)
    }

    if (status.value === 'error') {
      setTimeout(() => {
        setModal({
          status: 'ERROR',
          title: 'Gagal Perbaharui Post',
          message:
            'Mohon maaf, post yang Anda perbaharui gagal disimpan. Mohon coba beberapa saat lagi.',
        })
      }, 500)

      console.error(error)
    }
  }

  async function handleGoBack() {
    if (isPostModified.value) {
      setModal({
        status: 'LEAVING',
        title: 'Membatalkan Perubahan',
        message: 'Apakah Anda yakin ingin membatalkan perubahan?',
      })

      return
    }

    return await navigateTo('/posting')
  }

  /**
   * Watch form state and deterimine if user already
   * made changes compared to the original post
   */
  watch(
    postStore.form,
    debounce((formState) => {
      isPostModified.value = !isEqual(originalPost, formState)
    }, 500),
    {
      deep: true,
    },
  )
</script>

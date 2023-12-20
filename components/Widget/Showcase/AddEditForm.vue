<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ width: 'md:max-w-[799px]', height: 'md:max-h-750px' }"
    :overlay="false"
    as="div"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:px-8 sm:py-3',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            {{ props.isEditMode ? 'Edit' : 'Tambahkan' }} Item
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section
        class="showcase-form-body flex max-h-[606px] w-full flex-col gap-[10px] overflow-y-auto p-2"
      >
        <UForm :state="state">
          <input
            ref="imageUploader"
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            hidden
            @change="handleImageChange"
          />
          <div
            class="custom-border-dash mb-2 flex h-[206px] w-[719px] items-center justify-center gap-3 bg-gray-50"
          >
            <!-- TODO: refactor this section below into dropzone component -->
            <div
              v-if="!state.file.uri"
              class="flex h-full w-full flex-col items-center justify-center"
            >
              <p class="font-lato text-sm font-medium text-blue-gray-800">
                drag and drop berkas disini atau
              </p>
              <div class="mt-4 flex gap-[15px]">
                <button
                  class="flex flex-col items-center justify-center gap-3"
                  @click="selectImage"
                >
                  <img
                    src="~/assets/icons/common/upload-picture.svg"
                    alt="Ikon Upload Gambar"
                    width="45"
                    height="45"
                  />
                  <p class="font-lato text-sm font-normal text-pink-600">
                    Upload Gambar
                  </p>
                </button>
                <button
                  class="flex flex-col items-center justify-center gap-3"
                  @click="onOpenModalSelectLogo"
                >
                  <img
                    src="~/assets/icons/common/select-logo.svg"
                    alt="Ikon Pilih Logo"
                    width="45"
                    height="45"
                  />
                  <p class="font-lato text-sm font-normal text-green-500">
                    Pilih Logo
                  </p>
                </button>
              </div>
              <p class="mt-2 font-lato text-sm font-normal text-blue-gray-300">
                Ukuran Maksimal file upload 2 MB dengan resolusi 500 x 500
                pixel. (.jpg dan .png)
              </p>
            </div>
            <div
              v-else
              class="relative flex h-full w-full flex-col items-center justify-center"
            >
              <div
                class="flex h-[150px] w-[150px] items-center justify-center overflow-hidden"
              >
                <NuxtImg :src="state.file.uri" width="150" height="150" />
              </div>
              <div class="absolute right-3 top-3">
                <UButton color="primary" variant="ghost" @click="removeFile">
                  <NuxtIcon
                    name="common/trash"
                    aria-hidden="true"
                    class="text-base text-red-700"
                  />
                </UButton>
              </div>
            </div>
          </div>
          <UFormGroup label="Judul" name="title">
            <UInput
              v-model="state.title"
              placeholder="Masukkan judul"
              color="gray"
              maxlength="250"
            />
          </UFormGroup>
          <UFormGroup label="Deskripsi" name="description">
            <UTextarea
              v-model="state.description"
              placeholder="Masukkan deskipsi"
              color="gray"
              :rows="4"
              maxlength="500"
            />
            <p class="py-2 text-right font-lato text-xs text-gray-600">
              Tersisa
              <span class="text-gray-800">{{
                descriptionLengthRemaining
              }}</span>
              Karakter
            </p>
          </UFormGroup>
          <UFormGroup label="Link Redirect" name="link">
            <template #hint>
              <div class="flex w-full justify-between">
                <UToggle
                  v-model="isActiveLink"
                  color="primary"
                  class="right-0"
                />
              </div>
            </template>
            <UInput
              v-model="state.link"
              :disabled="!isActiveLink"
              placeholder="contoh: https://"
              color="gray"
            />
          </UFormGroup>
        </UForm>
      </section>
      <template #footer>
        <section class="flex justify-between">
          <UButton variant="ghost" color="gray" @click="onCancelForm">
            Batalkan
          </UButton>
          <UButton v-if="!props.isEditMode" @click="onSubmitShowcase">
            Simpan
          </UButton>
          <UButton v-else @click="onSaveShowcase"> Simpan </UButton>
        </section>
      </template>
    </UCard>

    <!-- Validation Error -->
    <BaseModal
      :open="imageUploadStatus === 'VALIDATION_ERROR'"
      with-close-button
      button-position="center"
      @close="closeConfirmationModal"
    >
      <div class="flex items-start">
        <NuxtIcon
          name="common/warning-circle"
          class="mr-4 inline-block flex-shrink-0 text-5xl"
          aria-hidden="true"
          filled
        />
        <div>
          <h3 class="mb-2 font-roboto text-xl font-semibold text-gray-800">
            {{ confirmation.title }}
          </h3>
          <p class="font-lato text-sm leading-6 text-gray-600">
            {{ confirmation.body }}
          </p>
        </div>
      </div>
      <template #footer>
        <UButton @click="closeConfirmationModal"> Saya Mengerti </UButton>
      </template>
    </BaseModal>

    <!-- Child Modal: Select Logo -->
    <WidgetShowcaseModalSelectLogo
      :open="isOpenModalSelectLogo"
      @close="toggleModalSelectLogo(false)"
      @select-logo="onSelectLogo"
    />
  </UModal>
</template>

<script setup lang="ts">
  import { ILogosData } from '~/repository/j-site/types/logo'
  import { validateImage } from '~/common/helpers/validation'
  import { IMediaResponseData } from '~/repository/j-site/types/media'

  const MEDIA_UPLOAD_STATUS = {
    NONE: 'NONE',
    UPLOADING: 'UPLOADING',
    DELETING: 'DELETING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
  }

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  })

  const state = reactive({
    file: {
      id: '',
      uri: '',
      source: '',
    },
    title: '',
    description: '',
    link: '',
    itemId: null,
  })

  const isActiveLink = ref(false)
  const isOpenModalSelectLogo = ref(false)
  const imageUploader = ref<HTMLInputElement | null>(null)
  const imageUploadStatus = ref(MEDIA_UPLOAD_STATUS.NONE)
  const imageUploadProgress = ref(0)
  const confirmation = reactive({
    title: '',
    body: '',
    icon: '',
    imageId: '', // for delete purposes
  })

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()

  const emit = defineEmits(['close', 'push-data', 'edit-data'])

  const MAX_DESCRIPTION_LENGTH = 500

  const descriptionLengthRemaining = computed(() => {
    return MAX_DESCRIPTION_LENGTH - state.description.length
  })

  watch(
    () => props.open,
    () => {
      if (props.isEditMode) {
        setInitialData()
      } else {
        resetForm()
      }
    },
  )

  function setInitialData() {
    const { file, title, description, link } = toRaw(props.data)
    state.file.id = file.id || ''
    state.file.uri = file.uri || ''
    state.file.source = file.source || ''
    state.title = title || ''
    state.description = description || ''
    state.link = link || ''
    isActiveLink.value = !!link
  }

  function selectImage() {
    imageUploader.value?.click()
  }

  function resetImageUploader() {
    if (imageUploader.value) {
      imageUploader.value.value = ''
    }
  }

  async function handleImageChange(event: Event) {
    const image = (event.target as HTMLInputElement)?.files?.[0] ?? null

    if (!image) {
      return resetImageUploader()
    }

    try {
      await validateImage(image, {
        maxSize: 2097152, // 2MB
        maxWidth: 500,
        maxHeight: 500,
        accepted: ['image/jpeg', 'image/jpg', 'image/png'],
      })
      uploadImage(image)
    } catch (error) {
      showValidationError()
    } finally {
      resetImageUploader()
    }
  }

  function showValidationError() {
    imageUploadStatus.value = MEDIA_UPLOAD_STATUS.VALIDATION_ERROR
    setConfirmation({
      title: 'Oops! Gambar nggak cocok nih.',
      body: 'Maaf, gambar yang kamu unggah kayaknya nggak sesuai deh. Cek lagi format dan ukurannya ya.',
    })
  }

  /**
   * NOTE: when this code is written, the `ofetch` library does not offer a way
   * to handle upload progress, so we have to do it manually
   *
   * See: {@link https://github.com/unjs/ofetch/issues/45 GitHub}.
   *
   * TODO: refactor this code if `ofetch` library support upload progress
   */
  async function uploadImage(image: File) {
    const formData = new FormData()

    formData.append('file', image)
    formData.append('caption', 'test')
    formData.append('category', 'slideshow')
    formData.append('setting_id', siteStore.siteId ?? '')

    setModalStatus(MEDIA_UPLOAD_STATUS.UPLOADING)
    setUploadProgress(25)

    const { data: uploadResponse, status } = await $jSiteApi.media.uploadMedia(
      formData,
      undefined,
      {
        server: false,
      },
    )

    setUploadProgress(75)

    if (status.value === 'success') {
      const data = toRaw(uploadResponse?.value?.data)

      if (data) {
        onUploadedImage(data)
        resetImageUploader()

        setTimeout(() => {
          setUploadProgress(100)

          setTimeout(() => {
            setModalStatus(MEDIA_UPLOAD_STATUS.SUCCESS)
            setConfirmation({
              title: 'Berhasil!',
              body: 'Gambar yang Anda unggah berhasil ditambahkan.',
              icon: 'common/check-circle',
            })
          }, 300)
        }, 300)
      }
    }

    if (status.value === 'error') {
      setModalStatus(MEDIA_UPLOAD_STATUS.ERROR)
      setConfirmation({
        title: 'Oops, Upload Gambar Gagal!',
        body: 'Mohon maaf, upload gambar gagal. Silakan coba beberapa saat lagi.',
        icon: 'common/warning-triangle',
      })
    }
  }

  function onUploadedImage({ id, file }: IMediaResponseData) {
    state.file.id = id || ''
    state.file.uri = file.uri || ''
    state.file.source = 'media'
  }

  async function deleteUploadedImage(id: string) {
    await $jSiteApi.media.deleteMedia(id, undefined, {
      server: false,
    })
  }

  interface ISetConfirmation {
    title: string
    body: string
    icon?: string
    imageId?: string
  }

  function setConfirmation({ title, body, icon, imageId }: ISetConfirmation) {
    confirmation.title = title
    confirmation.body = body

    if (icon) {
      confirmation.icon = icon
    }

    if (imageId) {
      confirmation.imageId = imageId
    }
  }

  function resetConfirmation() {
    confirmation.title = ''
    confirmation.body = ''
    confirmation.icon = ''
    confirmation.imageId = ''
  }

  function closeConfirmationModal() {
    imageUploadStatus.value = MEDIA_UPLOAD_STATUS.NONE
  }

  function setModalStatus(value: string) {
    imageUploadStatus.value = value
  }

  function setUploadProgress(value: number) {
    imageUploadProgress.value = value
  }

  function toggleModalSelectLogo(val: boolean) {
    isOpenModalSelectLogo.value = val
  }

  function onOpenModalSelectLogo() {
    toggleModalSelectLogo(true)
  }

  function onSelectLogo(logo: ILogosData) {
    state.title = logo.title || ''
    state.file.id = logo.file.id || ''
    state.file.uri = logo.file.uri || ''
    state.file.source = 'logo'
  }

  function resetForm() {
    state.file.id = ''
    state.file.uri = ''
    state.file.source = ''
    state.title = ''
    state.description = ''
    state.link = ''
    isActiveLink.value = false
  }

  function onSubmitShowcase() {
    emit('push-data', toRaw(state))
    resetForm()
    emit('close')
  }

  function onSaveShowcase() {
    emit('edit-data', toRaw(state))
    resetForm()
    emit('close')
  }

  async function onCancelForm() {
    if (state.file.source === 'media') {
      await deleteUploadedImage(state.file.id)
    }
    resetForm()
    emit('close')
  }

  async function removeFile() {
    if (state.file.source === 'media') {
      await deleteUploadedImage(state.file.id)
    }
    state.file.id = ''
    state.file.uri = ''
    state.file.source = ''
  }

  /**
   * Reset confirmation data and upload progress
   * when confirmation modal is closed
   */
  watch(imageUploadStatus, (newValue) => {
    if (newValue === MEDIA_UPLOAD_STATUS.NONE) {
      // wait modal to closed all the way before reset confirmation
      setTimeout(() => {
        setUploadProgress(0)
        resetConfirmation()
      }, 300)
    }
  })

  watch(isActiveLink, (value) => {
    if (!value) {
      state.link = ''
    }
  })
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }

  /* Scroll bar stylings */
  .showcase-form-body {
    scrollbar-color: #bdbdbd none;
    scrollbar-width: thin;
  }
  .showcase-form-body::-webkit-scrollbar {
    width: 4px;
  }

  .showcase-form-body::-webkit-scrollbar-track {
    background-color: none;
  }

  .showcase-form-body::-webkit-scrollbar-thumb {
    background-color: #bdbdbd;
    outline: none;
    border-radius: 6px;
    background-clip: padding-box;
  }
  /* End of scroll bar stylings */
</style>

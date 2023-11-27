<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[750px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-4 sm:px-0',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Pengaturan Slideshow
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

      <section class="grid grid-cols-1 gap-y-4">
        <div class="flex justify-end px-6">
          <UButton variant="outline" @click="selectImage">
            <template #leading>
              <NuxtIcon
                name="common/image-bubble"
                class="text-lg"
                aria-hidden="true"
                filled
              />
            </template>
            Upload Gambar
          </UButton>
          <input
            ref="imageUploader"
            type="file"
            hidden
            @change="handleImageChange"
          />
        </div>

        <div class="px-6">
          <UAlert title="">
            <template #title>
              <span class="font-lato text-sm text-gray-900">
                Rekomendasi ukuran gambar dengan resolusi
                <strong>1600 x 900 pixel.</strong> List media dibawah ini
                merupakan media yang sudah aktif di public view.
              </span>
            </template>
          </UAlert>
        </div>

        <div class="flex justify-end px-6">
          <!-- @todo: change data to be dynamic -->
          <UBadge color="blue" size="lg" variant="subtle">
            <div class="flex items-center gap-x-1.5">
              <span
                class="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-600"
              />
              <span class="font-lato text-sm text-gray-800">
                Media Aktif
                <strong>({{ uploadedImages.length }})</strong>
              </span>
            </div>
          </UBadge>
        </div>

        <div
          class="mb-4 grid max-h-[370px] w-full min-w-0 grid-cols-3 gap-6 overflow-y-auto px-6"
        >
          <template v-if="uploadedImages.length !== 0">
            <div
              v-for="(image, index) in uploadedImages"
              :key="`slideshow-image-preview-${index}`"
              class="group relative h-[173px] w-[216px] overflow-hidden rounded-lg"
            >
              <NuxtImg
                :src="image.uri"
                width="216"
                height="173"
                class="h-[173px] w-[216px] rounded-lg object-cover object-center"
              />
              <div
                class="absolute inset-0 h-full w-full p-2.5 transition-colors ease-in group-hover:bg-black/20"
              >
                <UButton
                  square
                  color="gray"
                  variant="ghost"
                  @click="showDeleteConfirmation(image.id)"
                >
                  <NuxtIcon
                    name="common/trash"
                    class="text-lg"
                    aria-hidden="true"
                    filled
                  />
                </UButton>
              </div>
            </div>
          </template>

          <template v-else>
            <p>Gambar Kosong...</p>
          </template>
        </div>
      </section>

      <!-- Upload Progress -->
      <ProgressModal
        :open="imageUploadStatus === 'UPLOADING'"
        :value="imageUploadProgress"
        title="Mengunggah Gambar"
        message="Mohon tunggu, pengunggahan gambar sedang diproses."
      />

      <!-- Delete Confirmation -->
      <BaseModal
        :open="imageUploadStatus === 'DELETING'"
        :header="confirmation.title"
      >
        <p class="flex items-center font-lato text-sm leading-6 text-gray-800">
          <NuxtIcon
            name="common/warning-triangle"
            class="mr-3 inline-block text-xl text-yellow-500"
            aria-hidden="true"
          />
          {{ confirmation.body }}
        </p>
        <template #footer>
          <UButton variant="outline" @click="closeConfirmationModal">
            Tidak
          </UButton>
          <UButton @click="deleteUploadedImage(confirmation.imageId)">
            Ya, hapus gambar
          </UButton>
        </template>
      </BaseModal>

      <!-- Upload/Delete Status -->
      <BaseModal
        :open="imageUploadStatus === 'SUCCESS' || imageUploadStatus === 'ERROR'"
        :header="confirmation.title"
      >
        <p class="flex items-center font-lato text-sm leading-6 text-gray-800">
          <NuxtIcon
            v-if="imageUploadStatus === 'SUCCESS'"
            name="common/check-circle"
            class="mr-3 inline-block text-xl text-green-700"
            aria-hidden="true"
          />
          <NuxtIcon
            v-if="imageUploadStatus === 'ERROR'"
            name="common/warning-triangle"
            class="mr-3 inline-block text-xl text-yellow-500"
            aria-hidden="true"
          />
          {{ confirmation.body }}
        </p>
        <template #footer>
          <UButton @click="closeConfirmationModal">Saya Mengerti</UButton>
        </template>
      </BaseModal>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import { IMediaResponseData } from '~/repository/j-site/types/media'
  const MEDIA_UPLOAD_STATUS = {
    NONE: 'NONE',
    UPLOADING: 'UPLOADING',
    DELETING: 'DELETING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  }

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()

  const imageUploader = ref<HTMLInputElement | null>(null)

  function selectImage() {
    imageUploader.value?.click()
  }

  function resetImageUploader() {
    if (imageUploader.value) {
      imageUploader.value.value = ''
    }
  }

  const uploadedImages = reactive<{ id: string; uri: string }[]>([])
  const imageUploadStatus = ref(MEDIA_UPLOAD_STATUS.NONE)
  const imageUploadProgress = ref(0)
  const confirmation = reactive({
    title: '',
    body: '',
    imageId: '', // for delete purposes
  })

  function handleImageChange(event: Event) {
    const image = (event.target as HTMLInputElement)?.files?.[0] ?? null

    if (image) {
      uploadImage(image)
    } else {
      resetImageUploader()
    }
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

    try {
      setModalStatus(MEDIA_UPLOAD_STATUS.UPLOADING)
      setUploadProgress(25)

      const response = await $jSiteApi.media.uploadMedia(formData, undefined, {
        server: false,
      })

      setUploadProgress(75)

      if (response.status.value === 'success') {
        const data = toRaw(response?.data?.value?.data)

        if (data) {
          pushUploadedImage(data)
          resetImageUploader()

          setTimeout(() => {
            setUploadProgress(100)

            setTimeout(() => {
              setModalStatus(MEDIA_UPLOAD_STATUS.SUCCESS)
              setConfirmation({
                title: 'Berhasil!',
                body: 'Gambar yang Anda unggah berhasil ditambahkan.',
              })
            }, 300)
          }, 300)
        }
      }
    } catch (error) {
      setModalStatus(MEDIA_UPLOAD_STATUS.ERROR)
      setConfirmation({
        title: 'Oops, Upload Gambar Gagal!',
        body: 'Mohon maaf, upload gambar gagal. Silakan coba beberapa saat lagi.',
      })
    }
  }

  function pushUploadedImage({ id, file }: IMediaResponseData) {
    uploadedImages.push({
      id: id,
      uri: file.uri,
    })
  }

  function removeUploadedImage(id: string) {
    const imageIndex = uploadedImages.findIndex((image) => image.id === id)
    uploadedImages.splice(imageIndex, 1)
  }

  function showDeleteConfirmation(imageId: string) {
    setModalStatus(MEDIA_UPLOAD_STATUS.DELETING)
    setConfirmation({
      title: 'Hapus Gambar',
      body: 'Apakah anda yakin ingin menghapus gambar ini?',
      imageId,
    })
  }

  async function deleteUploadedImage(id: string) {
    try {
      const response = await $jSiteApi.media.deleteMedia(id, undefined, {
        server: false,
      })

      if (response.status.value === 'success') {
        removeUploadedImage(id)

        setModalStatus(MEDIA_UPLOAD_STATUS.SUCCESS)
        setConfirmation({
          title: 'Berhasil!',
          body: 'Gambar berhasil dihapus.',
        })
      }
    } catch (error) {
      setModalStatus(MEDIA_UPLOAD_STATUS.ERROR)
      setConfirmation({
        title: 'Oops, Gagal menghapus gambar!',
        body: 'Mohon maaf, gambar gagal dihapus. Silakan coba beberapa saat lagi',
      })
    }
  }

  function setConfirmation({
    title,
    body,
    imageId,
  }: {
    title: string
    body: string
    imageId?: string
  }) {
    confirmation.title = title
    confirmation.body = body

    if (imageId) {
      confirmation.imageId = imageId
    }
  }

  function resetConfirmation() {
    confirmation.title = ''
    confirmation.body = ''
    confirmation.imageId = ''
  }

  function setModalStatus(value: string) {
    imageUploadStatus.value = value
  }

  function setUploadProgress(value: number) {
    imageUploadProgress.value = value
  }

  function closeConfirmationModal() {
    imageUploadStatus.value = MEDIA_UPLOAD_STATUS.NONE
  }

  /**
   * Reset confirmation data and upload progress
   * when confirmation modal is closed
   */
  watch(imageUploadStatus, (newValue) => {
    if (newValue === MEDIA_UPLOAD_STATUS.NONE) {
      setUploadProgress(0)
      resetConfirmation()
    }
  })

  defineEmits(['close'])
</script>

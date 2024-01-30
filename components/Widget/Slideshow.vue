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
          <h3
            class="font-roboto text-xl font-medium leading-8 text-green-800"
            data-cy="j-site-widget-slideshow__header"
          >
            Pengaturan Slideshow
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            data-cy="j-site-widget-slideshow__button-close"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section class="grid grid-cols-1 gap-y-4">
        <input
          ref="imageUploader"
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/webp"
          hidden
          :disabled="exceedMaximumFiles"
          @change="handleImageChange"
        />

        <div v-show="uploadedImages.length !== 0" class="flex justify-end px-6">
          <UTooltip
            text="Konten yang anda pasang sudah mencapai batas maksimal. 
            Silakan hapus terlebih dahulu media yang sedang aktif untuk melakukan upload."
            :ui="{
              background: 'bg-[#EEEEEE]',
              base: exceedMaximumFiles
                ? 'h-full px-3 py-2 whitespace-normal font-lato text-sm'
                : 'hidden',
              rounded: 'rounded-lg',
              ring: 'ring-[#BDBDBD]',
              color: 'text-[#616161]',
            }"
            :popper="{
              placement: 'bottom-start',
              offsetDistance: 8,
            }"
          >
            <UButton
              variant="outline"
              :disabled="exceedMaximumFiles"
              data-cy="j-site-widget-slideshow__button-upload-media"
              @click="selectImage"
            >
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
          </UTooltip>
        </div>

        <div v-show="uploadedImages.length !== 0" class="px-6">
          <UAlert title="">
            <template #title>
              <span class="font-lato text-sm text-gray-900">
                Rekomendasi ukuran gambar dengan resolusi
                <strong>1024 x 576 pixel</strong> dengan
                <strong>ukuran maksimal 2MB.</strong>
                List media dibawah ini merupakan media yang sudah aktif dengan
                batas maksimal
                <strong>6 media yang bisa diaktifkan</strong>
              </span>
            </template>
          </UAlert>
        </div>

        <div v-show="uploadedImages.length !== 0" class="flex justify-end px-6">
          <UBadge color="blue" size="lg" variant="subtle">
            <div class="flex items-center gap-x-1.5">
              <span
                class="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-600"
              />
              <span class="font-lato text-sm text-gray-800">
                Media Aktif
                <strong data-cy="j-site-widget-slideshow__counter-media">
                  ({{ uploadedImages.length }})
                </strong>
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
                :data-cy="`j-site-widget-slideshow__image-${index}`"
              />
              <div
                class="absolute inset-0 h-full w-full p-2.5 transition-colors ease-in group-hover:bg-black/20"
              >
                <UButton
                  square
                  color="gray"
                  variant="ghost"
                  :data-cy="`j-site-widget-slideshow__button-delete-media-${index}`"
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
            <NoData
              class="col-span-4"
              title="Kamu belum memiliki media"
              description="Kamu dapat menambahkan media melalui Pilih Media atau Upload Gambar 
              dibawah dengan rekomendasi ukuran gambar adalah resolusi 1024 x 576 pixel (.jpg dan png) 
              dan ukuran maksimal 2MB."
            >
              <UButton
                class="mt-7"
                data-cy="j-site-widget-slideshow__button-upload-media"
                @click="selectImage"
              >
                <template #leading>
                  <NuxtIcon
                    name="common/upload"
                    class="text-lg"
                    aria-hidden="true"
                    filled
                  />
                </template>
                Upload Gambar
              </UButton>
            </NoData>
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
        with-close-button
        header=""
        button-position="right"
        @close="closeConfirmationModal"
      >
        <div class="flex items-start">
          <NuxtIcon
            name="common/trash-circle"
            class="mr-4 inline-block flex-shrink-0 text-5xl"
            aria-hidden="true"
            filled
          />
          <div>
            <h3
              class="mb-2 font-roboto text-xl font-semibold text-gray-800"
              data-cy="j-site-modal__header"
            >
              {{ confirmation.title }}
            </h3>
            <p
              class="font-lato text-sm leading-6 text-gray-600"
              data-cy="j-site-modal__body"
            >
              {{ confirmation.body }}
            </p>
          </div>
        </div>
        <template #footer>
          <UButton
            variant="outline"
            color="gray"
            data-cy="j-site-modal__button-cancel"
            @click="closeConfirmationModal"
          >
            Batalkan
          </UButton>
          <UButton
            data-cy="j-site-modal__button-confirm"
            @click="deleteUploadedImage(confirmation.imageId)"
          >
            Ya, saya yakin
          </UButton>
        </template>
      </BaseModal>

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
            <h3
              class="mb-2 font-roboto text-xl font-semibold text-gray-800"
              data-cy="j-site-modal__header"
            >
              {{ confirmation.title }}
            </h3>
            <p
              class="font-lato text-sm leading-6 text-gray-600"
              data-cy="j-site-modal__body"
            >
              {{ confirmation.body }}
            </p>
          </div>
        </div>
        <template #footer>
          <UButton
            data-cy="j-site-modal__button-confirm"
            @click="closeConfirmationModal"
          >
            Saya Mengerti
          </UButton>
        </template>
      </BaseModal>

      <!-- Upload/Delete Status -->
      <BaseModal
        :open="imageUploadStatus === 'SUCCESS' || imageUploadStatus === 'ERROR'"
        :header="confirmation.title"
      >
        <p class="flex items-center">
          <NuxtIcon
            :name="confirmation.icon"
            :class="{
              'mr-3 inline-block text-xl text-white': true,
              '!text-green-500': imageUploadStatus === 'SUCCESS',
              '!text-yellow-500': imageUploadStatus === 'ERROR',
            }"
            aria-hidden="true"
          />
          <span
            data-cy="j-site-modal__body"
            class="font-lato text-sm leading-6 text-gray-800"
          >
            {{ confirmation.body }}
          </span>
        </p>
        <template #footer>
          <UButton
            data-cy="j-site-modal__button-confirm"
            @click="closeConfirmationModal"
          >
            Saya Mengerti
          </UButton>
        </template>
      </BaseModal>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
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

  const MAX_UPLOADED_IMAGES = 6

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    sectionIndex: {
      type: Number,
      default: null,
    },
    widgetIndex: {
      type: Number,
      default: null,
    },
  })

  const emit = defineEmits(['close', 'set-active-content'])

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()
  const pageStore = usePageStore()

  onMounted(() => {
    if (pageStore.isEdit) {
      return setInitialStateFromStore()
    }
    syncStorePayload()
  })

  /* ---------------------- Sync States ---------------------- */

  function syncStorePayload() {
    pageStore.setWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
      payload: {
        images: uploadedImages,
      },
    })
  }

  function setInitialStateFromStore() {
    const initialPayload = pageStore.getWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
    })

    if (initialPayload?.images) {
      initialPayload.images.map((image: { id: string; uri: string }) => {
        uploadedImages.push(image)
      })
    }
  }

  /* ------------------------- Image Upload and Delete ------------------------ */

  const imageUploader = ref<HTMLInputElement | null>(null)
  const uploadedImages = reactive<{ id: string; uri: string }[]>([])
  const imageUploadProgress = ref(0)

  const exceedMaximumFiles = computed<boolean>(() => {
    return uploadedImages.length >= MAX_UPLOADED_IMAGES
  })

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
        maxWidth: 1024, // 1024 pixel
        maxHeight: 576, // 576 pixel
      })
      uploadImage(image)
    } catch (error) {
      showValidationError()
    } finally {
      resetImageUploader()
    }
  }

  function setUploadProgress(value: number) {
    imageUploadProgress.value = value
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
    formData.append('caption', 'slideshow')
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
        pushUploadedImage(data)
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

  async function deleteUploadedImage(id: string) {
    const { status } = await $jSiteApi.media.deleteMedia(id, undefined, {
      server: false,
    })

    if (status.value === 'success') {
      removeUploadedImage(id)
      setModalStatus(MEDIA_UPLOAD_STATUS.SUCCESS)
      setConfirmation({
        title: 'Berhasil!',
        body: 'Gambar berhasil dihapus dari daftar slideshow.',
        icon: 'common/check-circle',
      })
    }

    if (status.value === 'error') {
      setModalStatus(MEDIA_UPLOAD_STATUS.ERROR)
      setConfirmation({
        title: 'Oops, Gagal menghapus gambar!',
        body: 'Mohon maaf, gambar gagal dihapus. Silakan coba beberapa saat lagi',
        icon: 'common/warning-triangle',
      })
    }
  }

  function pushUploadedImage({ id, file }: IMediaResponseData) {
    uploadedImages.push({
      id: id,
      uri: file.uri,
    })
  }

  /**
   * Remove image by id from `uploadedImage` state
   * @param id - id of images stored on `uploadedImages`
   */
  function removeUploadedImage(id: string) {
    const imageIndex = uploadedImages.findIndex((image) => image.id === id)
    uploadedImages.splice(imageIndex, 1)
  }

  /**
   * Mutate `page` store evey time `uploadedImages` changes
   */
  watch(uploadedImages, async () => {
    await nextTick()
    syncStorePayload()
  })

  watch(
    uploadedImages,
    (value) => {
      emit('set-active-content', value.length)
    },
    { immediate: true },
  )

  /* ---------------------------------- Modals --------------------------------- */

  interface ISetConfirmation {
    title: string
    body: string
    icon?: string
    imageId?: string
  }

  const imageUploadStatus = ref(MEDIA_UPLOAD_STATUS.NONE)

  const confirmation = reactive({
    title: '',
    body: '',
    icon: '',
    imageId: '', // for delete purposes
  })

  function setModalStatus(value: string) {
    imageUploadStatus.value = value
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

  function showValidationError() {
    imageUploadStatus.value = MEDIA_UPLOAD_STATUS.VALIDATION_ERROR
    setConfirmation({
      title: 'Oops! Gambar nggak cocok nih.',
      body: 'Maaf, gambar yang kamu unggah kayaknya nggak sesuai deh. Cek lagi format dan ukurannya ya.',
    })
  }

  function showDeleteConfirmation(imageId: string) {
    setModalStatus(MEDIA_UPLOAD_STATUS.DELETING)
    setConfirmation({
      title: 'Menghapus Gambar',
      body: 'Apakah anda yakin ingin menghapus gambar dari daftar slideshow?',
      imageId,
    })
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
</script>

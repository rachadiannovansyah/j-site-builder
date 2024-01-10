<template>
  <div class="rounded-lg bg-white p-[14px]">
    <p class="font-roboto text-base font-medium leading-6 text-green-700">
      Gambar Utama
    </p>
    <p class="mb-[14px] font-lato text-sm text-gray-800">
      Ukuran maksimal file adalah 1 MB dengan resolusi 1080 x 720 . File yang
      didukung adalah .jpg dan .png
    </p>

    <!-- Image Dropzone -->
    <UFormGroup :error="dropzoneErrorMessages.length > 0">
      <BaseDropzone
        accept="image/jpeg, image/jpg, image/png, image/webp"
        :disabled="!!image.id || isDropzoneUploading"
        @change="handleImageChange"
        @clear="handleDeleteImage"
      >
        <template
          v-if="!!image.id && !isDropzoneUploading"
          #preview="{ clear }"
        >
          <div
            class="mt-4 flex h-10 w-full max-w-[400px] items-center justify-between rounded-lg border border-gray-400 px-4"
          >
            <span
              class="truncate pr-4 font-lato text-sm leading-6 text-gray-800"
            >
              {{ image?.filename }}
            </span>
            <div class="flex flex-shrink-0">
              <UButton
                title="Pratinjau gambar"
                variant="ghost"
                square
                size="sm"
                @click="togglePreviewImage"
              >
                <NuxtIcon name="common/eye" class="text-2xl" />
              </UButton>
              <UButton
                title="Hapus gambar"
                variant="ghost"
                square
                size="sm"
                class="ml-2"
                @click="clear"
              >
                <NuxtIcon name="common/close" class="text-2xl" />
              </UButton>
            </div>
          </div>
        </template>
      </BaseDropzone>

      <template #error>
        <p
          v-for="error in dropzoneErrorMessages"
          :key="error"
          class="font-lato text-xs leading-6 text-red-500"
        >
          {{ error }}
        </p>
      </template>

      <p
        v-show="
          !image.id &&
          !isDropzoneUploading &&
          dropzoneErrorMessages.length === 0
        "
        class="mt-4 font-lato text-sm leading-6 text-gray-800"
      >
        Belum ada file terpilih
      </p>

      <p
        v-show="isDropzoneUploading && !image.id"
        class="mt-4 font-lato text-sm leading-6 text-gray-800"
      >
        Mengupload gambar...
      </p>
    </UFormGroup>

    <UFormGroup name="image" />
  </div>

  <!-- Image Preview -->
  <BaseModal
    :open="isPreviewImage"
    with-close-button
    @close="togglePreviewImage"
  >
    <NuxtImg
      :src="postStore.form.image.uri"
      :alt="postStore.form.image.filename"
      class="h-full w-full"
    />

    <template #footer>
      <UButton type="button" @click="togglePreviewImage"> Tutup </UButton>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
  import { usePostStore } from '~/stores/post'
  import { validateImage } from '~/common/helpers/validation'
  import { z } from 'zod'

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()
  const postStore = usePostStore()

  const image = computed(() => {
    return postStore.form.image
  })

  const dropzoneErrorMessages = ref<string[]>([])
  const isDropzoneUploading = ref(false)

  async function handleImageChange(image: File) {
    if (!image) return

    try {
      isDropzoneUploading.value = true
      dropzoneErrorMessages.value = []

      await validateImage(image, {
        maxSize: 1048576, // 1MB
        maxWidth: 1080, // 1080 pixel
        maxHeight: 720, // 720 pixel
      })

      const formData = new FormData()

      formData.append('file', image)
      formData.append('caption', 'post')
      formData.append('setting_id', siteStore.siteId ?? '')

      const response = await uploadImage(formData)
      const { file, id } = response?.value?.data ?? {}

      if (file && id) {
        postStore.setImage({
          id,
          uri: file.uri,
          filename: file.filename,
        })
      }
    } catch (error) {
      resetDropzone()
      if (error instanceof z.ZodError) {
        dropzoneErrorMessages.value = error.issues.map((err) => err.message)
      } else {
        console.error(error)
      }
    } finally {
      isDropzoneUploading.value = false
    }
  }

  async function uploadImage(formData: FormData) {
    const {
      data: uploadResponse,
      status,
      error,
    } = await $jSiteApi.media.uploadMedia(formData, undefined, {
      server: false,
    })

    if (status.value === 'success') {
      return uploadResponse
    } else if (status.value === 'error') {
      throw error
    }
  }

  async function handleDeleteImage() {
    try {
      await deleteUploadedImage(postStore.form.image.id)
      resetDropzone()
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteUploadedImage(id: string) {
    const { status, error } = await $jSiteApi.media.deleteMedia(id, undefined, {
      server: false,
    })

    if (status.value === 'error') {
      throw error
    }
  }

  function resetDropzone() {
    postStore.setImage({ id: '', uri: '', filename: '' })
  }

  const isPreviewImage = ref(false)

  function togglePreviewImage() {
    isPreviewImage.value = !isPreviewImage.value
  }
</script>

<style lang="scss" scoped></style>

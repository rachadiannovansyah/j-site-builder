<template>
  <div class="rounded-lg bg-white p-[14px]">
    <UFormGroup name="content">
      <Editor
        v-model="content"
        v-bind="tinyMCEConfig"
        data-cy="post-form__content-section__editor"
      />
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
  import Editor from '@tinymce/tinymce-vue'
  import { validateImage } from '~/common/helpers/validation'
  import { z } from 'zod'

  const config = useRuntimeConfig()
  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()
  const postStore = usePostStore()

  const tinyMCEConfig = Object.freeze({
    'api-key': config.public.tinyMceApiKey,
    init: {
      height: 500,
      placeholder: 'Tulis isi post di sini',
      language_url: '/tinymce/langs/id.js',
      language: 'id',
      skin_url: '/tinymce/skins',
      menubar: 'false',
      plugins: 'preview fullscreen lists link image media',
      toolbar: `
      undo redo | blocks | bold italic bullist numlist blockquote |
      alignleft aligncenter alignright alignjustify |
      link strikethrough indent outdent image media |
      preview fullscreen`,
      toolbar_mode: 'sliding',
      image_caption: true,
      paste_block_drop: true,
      invalid_elements: 'div',
      images_upload_handler: handleContentImageUpload,
    },
  })

  const content = computed({
    get() {
      return postStore.form.content
    },
    set(value) {
      postStore.setContent(value)
    },
  })

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleContentImageUpload(blobInfo: any) {
    try {
      await validateImage(blobInfo.blob(), {
        maxSize: 1048576, // 1MB
        maxWidth: 1080, // 1080 pixel
        maxHeight: 720, // 720 pixel
      })

      const formData = new FormData()

      formData.append('file', blobInfo.blob())
      formData.append('caption', 'post')
      formData.append('setting_id', siteStore.siteId ?? '')

      const response = await uploadImage(formData)
      const { file } = response?.value?.data ?? {}

      return new Promise((resolve) => resolve(file?.uri))
    } catch (error) {
      return new Promise((_, reject) => {
        // Validation error
        if (error instanceof z.ZodError) {
          reject({
            message: error.issues[0].message,
            remove: true,
          })
        } else {
          reject({
            message: `Mohon maaf upload gagal, silakan coba beberapa saat lagi.`,
            remove: true,
          })
        }
      })
    }
  }
</script>

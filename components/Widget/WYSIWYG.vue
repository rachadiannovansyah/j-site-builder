<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[750px]' }"
  >
    <UCard
      :ui="{
        header: {
          padding: 'sm:py-4',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Buat Konten
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

      <section class="min-h-[500px]">
        <Editor v-bind="tinyMCEConfig" v-model="editorContent" />
      </section>

      <template #footer>
        <section class="flex justify-between">
          <UButton
            variant="ghost"
            color="gray"
            type="button"
            @click="$emit('close')"
          >
            Batalkan
          </UButton>
          <UButton type="submit"> Simpan </UButton>
        </section>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import Editor from '@tinymce/tinymce-vue'
  const config = useRuntimeConfig()

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const tinyMCEConfig = Object.freeze({
    'api-key': config.public.tinyMceApiKey,
    init: {
      setup: editorSetup,
      height: 500,
      placeholder: 'Tulis isi post di sini',
      language_url: '/tinymce/langs/id.js',
      language: 'id',
      skin_url: '/tinymce/skins',
      menubar: 'false',
      plugins: 'lists link image media',
      toolbar: `
      undo redo | blocks | bold italic bullist numlist blockquote | 
      alignleft aligncenter alignright alignjustify |
      link strikethrough indent outdent image media`,
      toolbar_mode: 'sliding',
      image_caption: true,
      invalid_elements: 'div',
    },
  })

  const isEditorLoading = ref(true)
  const editorContent = ref('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function editorSetup(editor: any) {
    editor.on('init', () => {
      isEditorLoading.value = false
    })
  }

  defineEmits(['close'])
</script>

<template>
  <div
    ref="dropzone"
    :class="{
      'custom-border-dash h-[150px] w-full rounded-lg bg-gray-50 p-2': true,
      'cursor-not-allowed opacity-70': props.disabled,
    }"
    @drop.prevent="onDrop"
  >
    <div class="flex h-full w-full flex-col items-center justify-center">
      <NuxtIcon
        name="common/plus-circle"
        class="mb-2 text-4xl text-gray-600"
        alt="ikon tambah"
      />
      <div
        class="text-center font-lato text-sm font-medium leading-6 text-blue-gray-800"
      >
        <span>
          {{ props.guide }}
        </span>
        <br />
        <span class="mr-1">{{ props.helpText }}</span>
        <label class="inline cursor-pointer">
          <span
            class="border-b border-blue-500 p-0.5 text-blue-500 hover:border-blue-600 hover:text-blue-600"
          >
            klik untuk upload
          </span>
          <input
            ref="fileInput"
            type="file"
            hidden
            :accept="props.accept"
            :disabled="props.disabled"
            :multiple="props.multiple"
            :data-cy="
              dataCy ? `${dataCy}-dropzone__input-file` : 'dropzone__input-file'
            "
            @change="onChooseFile"
          />
        </label>
      </div>
    </div>
  </div>

  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <slot v-if="$slots.preview" name="preview" :clear="onClear"></slot>
  </transition>
</template>

<script lang="ts" setup>
  const props = defineProps({
    guide: {
      type: String,
      default: 'drag and drop gambar di sini,',
    },
    helpText: {
      type: String,
      default: 'atau',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    dataCy: {
      type: String,
      default: null,
    },
  })

  const dropzone = ref<HTMLInputElement | null>(null)
  const fileInput = ref<HTMLInputElement | null>(null)

  const events = ['dragenter', 'dragover', 'dragleave', 'drop']

  onMounted(() => {
    events.forEach((eventName) => {
      dropzone.value?.addEventListener(eventName, preventDefaults)
    })
  })

  onBeforeUnmount(() => {
    events.forEach((eventName) => {
      dropzone.value?.removeEventListener(eventName, preventDefaults)
    })
  })

  function preventDefaults(event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }

  function onDrop(event: DragEvent) {
    if (props.disabled) return

    const dataTransfer = event.dataTransfer

    const files = props.multiple ? dataTransfer?.files : dataTransfer?.files[0]

    emit('change', files)
  }

  function onChooseFile(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target) return

    const files = props.multiple ? target.files : target.files![0]

    emit('change', files)
  }

  function resetFileInput() {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  function onClear() {
    resetFileInput()
    emit('clear')
  }

  const emit = defineEmits(['change', 'clear'])
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
</style>

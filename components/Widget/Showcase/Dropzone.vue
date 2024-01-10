<template>
  <div
    ref="dropzone"
    :class="{
      'custom-border-dash h-[206px] w-full rounded-lg bg-gray-50 py-3': true,
      'cursor-not-allowed opacity-70': props.disabled,
    }"
    @drop.prevent="onDrop"
  >
    <div class="flex h-full w-full flex-col items-center justify-center gap-3">
      <p class="font-lato text-sm font-medium text-blue-gray-800">
        drag and drop berkas disini atau
      </p>
      <div class="mt-4 flex gap-[15px]">
        <button
          class="flex flex-col items-center justify-center gap-3"
          data-cy="j-site-widget-showcase__form-button-upload-file"
          @click="onChooseFile"
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
          data-cy="j-site-widget-showcase__form-button-select-logo"
          @click="onSelectLogo"
        >
          <img
            src="~/assets/icons/common/select-logo.svg"
            alt="Ikon Pilih Logo"
            width="45"
            height="45"
          />
          <p class="font-lato text-sm font-normal text-green-500">Pilih Logo</p>
        </button>
      </div>
      <p class="mt-2 font-lato text-sm font-normal text-blue-gray-300">
        Ukuran Maksimal file upload 2 MB dengan resolusi 500 x 500 pixel. (.jpg
        dan .png)
      </p>
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

  const emit = defineEmits(['drop', 'change', 'clear', 'select'])

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
    const files = dataTransfer?.files[0]

    emit('drop', files)
  }

  function onChooseFile() {
    emit('change')
  }

  function onSelectLogo() {
    emit('select')
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
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
</style>

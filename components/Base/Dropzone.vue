<template>
  <h3>
    Ukuran maksimal file adalah 1 MB dengan resolusi 1080 x 720 . File yang
    didukung adalah .jpg dan .png
  </h3>
  <div v-bind="getRootProps()">
    <div
      :class="{
        'flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-2 pb-[23px] pt-2': true,
        isDragActive,
      }"
    >
      <input v-bind="getInputProps()" />
      <div class="flex flex-col items-center justify-center gap-y-4">
        <img
          width="30"
          height="30"
          src="@/assets/icons/common/plus-circle.svg"
          alt="icon tambah dengan lingkaran"
        />
        <p class="text-center">
          Seret dan lepaskan file disini, <br />
          atau
          <u class="text-blue-500">klik untuk upload</u>
        </p>
      </div>
    </div>
  </div>

  <template v-if="files.length > 0">
    <div
      v-for="(file, index) in files"
      :key="index"
      class="flex max-w-[440px] flex-row items-center justify-between rounded-lg border p-2"
    >
      <span>{{ file.name }}</span>
      <NuxtIcon size="30" name="common/eye" />
      <UButton @click="handleClickDeleteFile(index)">
        <NuxtIcon name="common/close" />
      </UButton>
    </div>
  </template>
  <p v-else>Belum ada file terpilih</p>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import { useDropzone } from 'vue3-dropzone'
  import type { FileRejectReason } from 'vue3-dropzone'

  type IFiles = File[]

  const props = defineProps({
    files: {
      type: Array as PropType<IFiles>,
      default: () => [],
    },
    accept: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024,
    },
    maxFiles: {
      type: Number,
      default: 0,
    },
    minSize: {
      type: Number,
      default: 0,
    },
    noClick: {
      type: Boolean,
      default: false,
    },
    noKeyboard: {
      type: Boolean,
      default: false,
    },
    noDrag: {
      type: Boolean,
      default: false,
    },
    noDragEventsBubbling: {
      type: Boolean,
      default: false,
    },
  })

  const multiple = computed(() => props.multiple)
  const disabled = computed(() => props.disabled)
  const minSize = computed(() => props.minSize)
  const accept = computed(() => props.accept)
  const maxSize = computed(() => props.maxSize)

  const options = reactive({
    multiple,
    accept,
    maxSize,
    minSize,
    disabled,
    onDrop,
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone(options)

  function onDrop(acceptFiles: File[], rejectReasons: FileRejectReason[]) {
    emit('change:files', { acceptFiles, rejectReasons })
  }

  function handleClickDeleteFile(index: number) {
    emit('delete:files', index)
  }

  const emit = defineEmits(['change:files', 'delete:files', 'update:files'])
</script>

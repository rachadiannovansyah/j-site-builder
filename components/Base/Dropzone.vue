<template>
  <div
    class="h-[150px] w-full rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 p-2"
    @drop.prevent="onDrop"
  >
    <div class="flex h-full w-full flex-col items-center justify-center">
      <img
        src="@/assets/icons/common/plus-circle.svg"
        width="38"
        height="38"
        alt="ikon tambah"
      />
      <div class="text-center">
        <span
          class="font-lato text-sm font-medium leading-6 text-blue-gray-800"
        >
          {{ guide }}
        </span>
        <br />
        <span>{{ helpText }}</span>
        <label class="inline cursor-pointer">
          <u
            :class="{
              'text-sm text-blue-500': true,
              'opacity-50': disabled,
            }"
          >
            klik untuk upload
          </u>
          <input
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
  <slot name="preview" :clear="onClear"> </slot>
</template>

<script lang="ts" setup>
  const props = defineProps({
    guide: {
      type: String,
      default: 'drag and drop gambar di sini',
    },
    helpText: {
      type: String,
      default: ', atau',
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

    emit('chooseFile', files)
  }

  function onClear() {
    // @TODO: function to remove file
  }

  const emit = defineEmits(['change', 'chooseFile'])
</script>

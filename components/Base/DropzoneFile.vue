<template>
  <div>
    <div ref="dropRef" class="dropzone h-[200px] w-full bg-red-500"></div>
    <div class="dz-preview dz-file-preview">
      <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
        <div class="dz-size" data-dz-size></div>
        <img data-dz-thumbnail />
      </div>
      <div class="dz-progress">
        <span class="dz-upload" data-dz-uploadprogress></span>
      </div>
      <img
        src="@/assets/icons/common/trash.svg"
        alt="Click me to remove the file."
        data-dz-remove
      />
      <div class="dz-success-mark"><span>✔</span></div>
      <div class="dz-error-mark"><span>✘</span></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Dropzone from 'dropzone'

  const dropRef = ref(null)
  const options = reactive({
    url: 'https://localhost:3000/',
    method: 'post',
    maxFilesize: 1, // in MiB or MB
    maxFiles: 3,
    uploadMultiple: true,
    acceptedFiles: '.jpg, .png, .webp',
    clickable: true,
  })

  onMounted(() => {
    if (dropRef.value !== null) {
      new Dropzone(dropRef.value, options)
    }
  })
</script>

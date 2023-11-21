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
          <!-- @todo: handle image upload -->
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
          <input ref="imageUploader" type="file" hidden />
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
                <strong>(6)</strong>
              </span>
            </div>
          </UBadge>
        </div>

        <div
          class="mb-4 grid max-h-[370px] w-full min-w-0 grid-cols-3 gap-6 overflow-y-auto px-6"
        >
          <!-- @todo: change image data to be dynamic -->
          <div
            v-for="index in 9"
            :key="`slideshow-image-preview-${index}`"
            class="group relative h-[173px] w-[216px] overflow-hidden rounded-lg"
          >
            <NuxtImg
              src="https://placehold.co/216x173"
              width="216"
              height="173"
              class="rounded-lg"
            />
            <div class="absolute inset-0 h-full w-full p-2.5">
              <!-- @todo: add delete image functionality -->
              <UButton square color="gray" variant="ghost">
                <NuxtIcon
                  name="common/trash"
                  class="text-lg"
                  aria-hidden="true"
                  filled
                />
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const imageUploader = ref<HTMLInputElement | null>(null)

  function selectImage() {
    imageUploader.value?.click()
  }

  defineEmits(['close'])
</script>

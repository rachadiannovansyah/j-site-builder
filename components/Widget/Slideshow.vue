<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[1024px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-4 sm:px-6',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
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

      <section class="h-[500px] w-full rounded-lg bg-gray-200">
        <!-- @todo: add slideshow config here -->
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

  defineEmits(['close'])
</script>

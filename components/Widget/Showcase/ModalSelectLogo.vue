<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ width: 'md:max-w-[661px]', height: 'md:max-h-608px' }"
    :overlay="false"
    as="div"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:px-6 sm:py-4',
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
            Pilih Logo
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

      <section class="flex max-h-[458px] w-full flex-col gap-6">
        <SearchBar placeholder="Cari Logo" />
        <div>List Logo</div>
      </section>
      <template #footer>
        <section class="flex justify-end">
          <UButton disabled> Pilih Logo </UButton>
        </section>
      </template>
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

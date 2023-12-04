<template>
  <!-- Parent Modal: List Showcase -->
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ width: 'md:max-w-[734px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:px-2 sm:pb-2 sm:pt-0',
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
            Pengaturan Showcase
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="$emit('close')"
          />
        </div>
        <div class="mt-4 flex justify-end">
          <UButton
            color="primary"
            variant="solid"
            label="Tambah"
            icon="i-heroicons-plus-20-solid"
            @click="isOpenAddEditShowcase = true"
          />
        </div>
      </template>

      <section
        class="flex h-[385px] w-full flex-col items-center justify-center gap-x-3 gap-y-4 overflow-y-auto bg-[#F9F9F9] px-6 py-4 md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        <!-- @todo: update list showcase -->
        <div
          v-for="item in 9"
          :key="item"
          class="relative flex h-[213px] w-[216px] flex-col items-center justify-center gap-4"
        >
          <div
            class="flex h-[173px] w-[216px] items-center justify-center rounded-lg bg-white"
          >
            <img
              src="/logos/logo.svg"
              alt="Portal Jabar Logo"
              width="72"
              height="78"
            />
          </div>
          <p class="font-roboto text-base font-medium text-gray-800">Item</p>
          <button class="absolute left-3 top-3">
            <NuxtIcon
              name="common/trash"
              aria-hidden="true"
              class="text-base text-red-700"
            />
          </button>
          <button class="absolute right-3 top-3">
            <NuxtIcon
              name="common/pencil"
              aria-hidden="true"
              class="text-base text-green-700"
            />
          </button>
        </div>
      </section>
    </UCard>

    <!-- Child Modal: Add/Edit Showcase -->
    <WidgetShowcaseAddEditForm
      :open="isOpenAddEditShowcase"
      :is-edit-mode="isEditShowcase"
      @close="isOpenAddEditShowcase = false"
    />
  </UModal>
</template>

<script setup lang="ts">
  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const isEditShowcase = ref(false)
  const isOpenAddEditShowcase = ref(false)

  defineEmits(['close'])
</script>

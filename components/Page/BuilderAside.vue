<template>
  <aside
    :class="{
      'mt-3 flex h-fit w-[280px] flex-col items-start justify-between gap-[14px] rounded-lg bg-white px-[14px] py-4 shadow transition-all duration-150 ease-in-out': true,
      '!h-16 !w-16': !isOpen,
    }"
  >
    <div class="flex h-full w-full justify-between">
      <div
        :class="{
          'flex w-full flex-row items-center gap-3': true,
          'justify-center !gap-0': !isOpen,
        }"
      >
        <UButton
          variant="outline"
          color="gray"
          size="sm"
          :square="true"
          :ui="{ variant: { outline: 'ring-gray-300' } }"
          @click="toggleOpenSide"
        >
          <NuxtIcon
            name="common/chevron-duo-left"
            :class="{ 'text-2xl text-[#393939]': true, 'rotate-180': isOpen }"
            aria-hidden="true"
          />
        </UButton>
        <h1
          v-show="isOpen"
          class="font-roboto text-base font-medium text-green-700"
        >
          Atribut
        </h1>
      </div>
    </div>
    <div v-show="isOpen" class="flex w-full flex-col gap-[14px]">
      <div class="flex w-full flex-col gap-1">
        <BaseInput
          :model-value="props.title"
          label="Judul Page"
          @update:model-value="$emit('update', $event)"
        />
      </div>
      <div class="flex w-full flex-col gap-1">
        <BaseInput
          :model-value="props.lastUpdate"
          label="Update Terakhir"
          disabled
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    lastUpdate: {
      type: String,
      default: '',
    },
  })

  const isOpen = ref(true)

  const toggleOpenSide = () => {
    isOpen.value = !isOpen.value
  }

  defineEmits(['update'])
</script>

<template>
  <UPopover class="mb-3" :open="openWidgetLayoutOption">
    <UButton
      color="white"
      trailing-icon="i-heroicons-chevron-down-20-solid"
      @click="toggleOpenModal"
    >
      <NuxtIcon
        :name="selectedWidgetLayout.icon"
        class="text-2xl text-[#424242]"
        aria-hidden="true"
        filled
      />
      {{ selectedWidgetLayout.label }}
    </UButton>
    <template #panel>
      <div class="px-3 py-2">
        <ul class="flex flex-col divide-y divide-solid">
          <li
            v-for="option in widgetLayoutOption"
            :key="option.id"
            class="flex cursor-pointer items-center gap-[10px] px-3 py-2"
            @click="onSelectWidgetLayout(option)"
          >
            <div class="h-6 w-6">
              <NuxtIcon
                :name="option.icon"
                class="text-2xl"
                aria-hidden="true"
                filled
              />
            </div>
            <p class="font-inter text-sm font-medium text-gray-700">
              {{ option.label }}
            </p>
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
  const widgetLayoutOption = [
    {
      id: 'grid',
      label: 'Grid',
      icon: 'widget/layout-option-grid',
    },
    {
      id: 'row',
      label: 'Row',
      icon: 'widget/layout-option-row',
    },
  ]
  const selectedWidgetLayout = ref(widgetLayoutOption[0])
  const openWidgetLayoutOption = ref(false)

  const emit = defineEmits<{
    (e: 'select', val: object): void
  }>()

  function onSelectWidgetLayout(option: {
    id: string
    label: string
    icon: string
  }) {
    emit('select', option)
    selectedWidgetLayout.value = option
    toggleOpenModal()
  }

  function toggleOpenModal() {
    openWidgetLayoutOption.value = !openWidgetLayoutOption.value
  }
</script>

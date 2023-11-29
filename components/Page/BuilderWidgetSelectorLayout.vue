<template>
  <UPopover class="mb-3" :open="openWidgetLayoutOption">
    <UButton
      color="white"
      trailing-icon="i-heroicons-chevron-down-20-solid"
      @click="toggleOpenModal"
    >
      <NuxtIcon
        name="common/widget-layout-option"
        class="text-2xl"
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
            class="flex cursor-pointer gap-[10px] px-3 py-2"
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
            <p class="font-inter text-base font-medium text-gray-700">
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
      id: 'row',
      label: 'Row',
      icon: 'common/widget-layout-option-row',
    },
    {
      id: 'grid',
      label: 'Grid',
      icon: 'common/widget-layout-option-grid',
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

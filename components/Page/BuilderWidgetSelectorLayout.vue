<template>
  <USelectMenu
    v-model="selectedWidgetLayout"
    :options="widgetLayoutOption"
    selected-icon=""
    size="xl"
    :ui="{
      rounded: 'rounded-lg',
    }"
  >
    <template #leading>
      <NuxtIcon
        :name="getWidgetLayoutOptionIcon(selectedWidgetLayout)"
        class="text-2xl text-[#424242]"
        aria-hidden="true"
        filled
      />
    </template>
    <template #label>
      <span class="font-roboto text-base font-normal capitalize">
        {{ selectedWidgetLayout }}
      </span>
    </template>
    <template #option="{ option }">
      <div class="flex h-6 w-6 items-center gap-2">
        <NuxtIcon
          :name="option.icon"
          class="text-2xl text-[#424242]"
          aria-hidden="true"
          filled
        />
        <p class="font-inter text-sm font-medium text-gray-700">
          {{ option.label }}
        </p>
      </div>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
  const props = defineProps({
    sectionIndex: {
      type: Number,
      default: null,
    },
    widgetIndex: {
      type: Number,
      default: null,
    },
  })

  interface IWidgetLayout {
    id: string
    label: string
    icon: string
  }

  const widgetLayoutOption: IWidgetLayout[] = [
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

  const pageStore = usePageStore()

  onMounted(() => {
    if (!selectedWidgetLayout.value) {
      pageStore.setWidgetPayload({
        sectionIndex: props.sectionIndex,
        widgetIndex: props.widgetIndex,
        payload: {
          display: widgetLayoutOption[0].id,
        },
      })
    }
  })

  const selectedWidgetLayout = computed({
    get() {
      return pageStore.builderConfig.sections[props.sectionIndex].widgets[
        props.widgetIndex
      ].payload?.display
    },
    set(value) {
      pageStore.setWidgetPayload({
        sectionIndex: props.sectionIndex,
        widgetIndex: props.widgetIndex,
        payload: {
          display: value.id,
        },
      })
    },
  })

  function getWidgetLayoutOptionIcon(id: string) {
    const option = widgetLayoutOption.find((option) => option.id === id)
    return option?.icon || ''
  }
</script>

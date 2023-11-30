<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex gap-[10px]">
      <!-- Popup Change Widget -->
      <UPopover class="mb-3">
        <UButton
          color="white"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        >
          <template #leading>
            <NuxtIcon
              :name="widgetIcon"
              class="text-2xl"
              aria-hidden="true"
              filled
            />
          </template>
          {{ props.widgetName }}
        </UButton>
        <template #panel>
          <div class="p-4">
            <div class="h-[400px] w-[600px] bg-gray-200" />
          </div>
        </template>
      </UPopover>

      <!-- Popup Setup Layout (Grid/Row) -->
      <PageBuilderWidgetSelectorLayout
        v-if="props.widget === 'Showcase' || props.widget === 'Gallery'"
      />
    </div>
    <p class="mb-8 text-center font-lato text-sm leading-6 text-gray-500">
      Setup element sesuai dengan kebutuhan kamu
    </p>
    <div class="max-w-[200px]">
      <UButton @click="toggleConfig">
        <template #leading>
          <NuxtIcon
            name="common/cog-wheel"
            class="text-lg"
            aria-hidden="true"
          />
        </template>
        Setup Konten
        <template v-if="activeContent !== 0" #trailing>
          <div
            class="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-red-600"
          >
            <span class="font-roboto text-xs font-medium leading-none">
              {{ activeContent }}
            </span>
          </div>
        </template>
      </UButton>
    </div>
  </div>

  <component
    :is="widgetConfig"
    :open="isConfigOpen"
    :section-index="props.sectionIndex"
    :widget-index="props.widgetIndex"
    @close="toggleConfig"
    @set-active-content="activeContent = $event"
  />
</template>

<script setup lang="ts">
  import { WIDGET_ICON_MAP } from '~/common/constant/widget'

  const props = defineProps({
    widget: {
      type: String,
      default: '',
    },
    widgetName: {
      type: String,
      default: '',
    },
    widgetIndex: {
      type: Number,
      default: null,
    },
    sectionIndex: {
      type: Number,
      default: null,
    },
  })

  // Widget Dynamic import
  const WidgetSlideshow = resolveComponent('WidgetSlideshow')
  const WidgetGallery = resolveComponent('WidgetGallery')
  const WidgetShowcase = resolveComponent('WidgetShowcase')
  const WidgetPostCrawler = resolveComponent('WidgetPostCrawler')
  const WidgetAgenda = resolveComponent('WidgetAgenda')
  // add another widget here...

  const isConfigOpen = ref(false)
  const activeContent = ref(0)

  function toggleConfig() {
    isConfigOpen.value = !isConfigOpen.value
  }

  const widgetConfig = computed(() => {
    switch (props.widget) {
      case 'Slideshow':
        return WidgetSlideshow
      case 'Showcase':
        return WidgetShowcase
      case 'Gallery':
        return WidgetGallery
      case 'PostCrawler':
        return WidgetPostCrawler
      case 'Agenda':
        return WidgetAgenda
      // add another case here
      default:
        break
    }
  })

  /**
   * get widget icon dynamically from WIDGET_ICON_MAP constant
   * @returns {string} - widget icon name
   */
  const widgetIcon = computed<string>(() => {
    return WIDGET_ICON_MAP[props.widget] ?? ''
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- @todo: add widget selection menu and grid selector for specific widget -->
    <UPopover class="mb-3">
      <UButton color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
        {{ props.widgetName }}
      </UButton>
      <template #panel>
        <div class="p-4">
          <div class="h-[400px] w-[600px] bg-gray-200" />
        </div>
      </template>
    </UPopover>
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
      </UButton>
    </div>
  </div>

  <component
    :is="widgetConfig"
    :open="isConfigOpen"
    :section-index="props.sectionIndex"
    :widget-index="props.widgetIndex"
    @close="toggleConfig"
  />
</template>

<script setup lang="ts">
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
  // add another widget here...

  const isConfigOpen = ref(false)

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
      // add another case here
      default:
        break
    }
  })
</script>

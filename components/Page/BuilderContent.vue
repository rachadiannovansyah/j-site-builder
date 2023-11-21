<template>
  <main class="grid h-full w-full px-4">
    <!-- Loading Skeleton -->
    <template v-if="props.loading">
      <div class="flex flex-col gap-y-[27px]">
        <section
          v-for="index in 8"
          :key="`builder-skeleton-${index}`"
          class="h-[406px] w-full animate-pulse rounded-lg bg-gray-200"
        />
      </div>
    </template>
    <template v-else>
      <section
        v-for="(section, index) in sections"
        :key="`builder-section-${index}`"
      >
        <div class="my-1.5 flex h-[17px] w-full items-center">
          <span class="h-[1px] flex-1 bg-[#DEDEDE]" />
          <p
            v-if="index < 2"
            class="flex-none px-1 font-inter text-xs font-medium text-[#989898]"
          >
            {{ index === 0 ? 'Hero Section' : 'Konten Section' }}
          </p>
          <span class="h-[1px] flex-1 bg-[#DEDEDE]" />
        </div>
        <PageBuilderWidgetContainer :section="section" :section-index="index" />
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
  const props = defineProps({
    loading: {
      type: Boolean,
      default: true,
    },
  })

  const pageStore = usePageStore()

  const sections = computed(() => {
    return pageStore.builderConfig.sections
  })
</script>

<template>
  <main class="grid h-full w-full px-4">
    <section v-for="(section, index) in sections" :key="index">
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
  </main>
</template>

<script setup lang="ts">
  const pageStore = usePageStore()

  const sections = computed(() => {
    return pageStore.builderConfig.sections
  })
</script>

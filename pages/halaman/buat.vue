<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-[#F3F4F8]">
    <PageHeaderCreate />
    <div
      class="mb-4 flex h-full w-full justify-between overflow-y-auto px-1 py-4"
    >
      <PageContentCreate :data="data.sections" />
      <PageAsideCreate />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'public',
  })

  const pageStore = usePageStore()
  const data = JSON.parse(JSON.stringify(pageStore.page))
</script>

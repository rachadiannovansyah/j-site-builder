<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-[#F7F7F9]">
    <PageHeaderCreate />
    <div
      class="mb-4 flex h-full w-full justify-between overflow-y-auto px-1 py-4"
    >
      <PageContentCreate />
      <PageAsideCreate />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'public',
  })
  console.log('aaa')
</script>

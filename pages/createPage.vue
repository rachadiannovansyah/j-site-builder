<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-gray-50">
    <PageHeaderCreate />
    <div class="flex h-full w-full justify-between overflow-y-auto px-1 py-4">
      <main class="h-full w-full px-4">
        <!-- TODO: replace with content page structure -->
        Page structure
      </main>
      <PageAsideCreate />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'public',
  })
</script>

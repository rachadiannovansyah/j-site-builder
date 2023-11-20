<template>
  <div class="flex h-screen w-full items-center justify-center overflow-y-auto">
    <main class="h-full w-full">
      <slot />
    </main>
  </div>

  <LoadingOverlay v-if="loadingStore.loading" />
</template>

<script setup lang="ts">
  const loadingStore = useLoadingStore()
</script>

<style>
  .nuxt-icon svg {
    @apply mb-0;
  }
</style>

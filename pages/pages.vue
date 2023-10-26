<template>
  <div class="h-full w-full">
    <TabMenu :tabs="PAGE_TAB_MENU" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { PAGE_TAB_MENU } from '~/common/constant/navigation'

  onMounted(async () => {
    await navigateTo({ path: '/pages/all' })
  })
</script>

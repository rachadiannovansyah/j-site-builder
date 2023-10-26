<template>
  <div class="w-full px-6 py-[14px]">
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

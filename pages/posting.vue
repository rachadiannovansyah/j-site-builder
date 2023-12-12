<template>
  <div class="h-full w-full">
    <TabMenu :tabs="POST_TAB_MENU" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { POST_TAB_MENU } from '~/common/constant/navigation'

  const route = useRoute()

  onMounted(async () => {
    if (route.path === '/posting') {
      await navigateTo({ path: '/posting/semua' })
    }
  })
</script>

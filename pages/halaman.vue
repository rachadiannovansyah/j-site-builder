<template>
  <div class="h-full w-full">
    <TabMenu v-if="route.path !== '/halaman/buat'" :tabs="PAGE_TAB_MENU" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { PAGE_TAB_MENU } from '~/common/constant/navigation'

  const route = useRoute()

  onMounted(async () => {
    if (route.path === '/halaman') {
      await navigateTo({ path: '/halaman/semua' })
    }
  })
</script>

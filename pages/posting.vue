<template>
  <div class="h-full w-full">
    <TabMenu v-if="!isPostForm" :tabs="POST_TAB_MENU" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { POST_TAB_MENU } from '~/common/constant/navigation'

  const route = useRoute()

  const isPostForm = computed(() => {
    return route.path.includes('buat') || route.path.includes('ubah')
  })

  onMounted(async () => {
    if (route.path === '/posting') {
      await navigateTo({ path: '/posting/semua' })
    }
  })
</script>

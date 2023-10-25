<template>
  <header
    data-cy="header__container"
    class="flex h-[72px] w-full items-center justify-between bg-white px-6"
  >
    <h1
      data-cy="header__title"
      class="mr-4 font-roboto text-xl font-bold text-blue-gray-800"
    >
      {{ pageTitle }}
    </h1>
    <HeaderMenu @logout="handleLogout" />
  </header>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth'

  const route = useRoute()
  const pageTitle = route.meta?.title ?? ''

  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  const handleLogout = async () => {
    await authStore.logout()
    window.location.replace(`${config.public.portalJabarCMSBaseURL}/logout`)
  }
</script>

<style scoped></style>

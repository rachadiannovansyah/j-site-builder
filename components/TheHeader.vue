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
    <HeaderMenu @logout="toggleLogoutModal" />
  </header>

  <!-- Logout Modal -->
  <BaseModal :open="state.isModalOpen">
    <ModalTitle class="text-center"> Keluar J-Site </ModalTitle>
    <ModalBody class="text-center">
      <span class="font-lato text-sm leading-6 text-gray-800">
        Apakah Anda yakin akan keluar dari J-Site?
      </span>
    </ModalBody>
    <ModalFooter position="center">
      <BaseButton variant="secondary" @click="toggleLogoutModal">
        Batal
      </BaseButton>
      <BaseButton variant="primary" @click="handleLogout">
        Ya, saya yakin
      </BaseButton>
    </ModalFooter>
  </BaseModal>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth'

  const route = useRoute()

  const pageTitle = computed(() => {
    return route.meta?.title
  })

  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  const state = reactive({
    isModalOpen: false,
  })

  const toggleLogoutModal = () => {
    state.isModalOpen = !state.isModalOpen
  }

  const handleLogout = async () => {
    await authStore.logout()
    window.location.replace(`${config.public.portalJabarCMSBaseURL}/logout`)
  }
</script>

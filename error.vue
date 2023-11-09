<template>
  <NuxtLayout v-if="error?.statusCode === 404">
    <UnderConstruction />
  </NuxtLayout>

  <NuxtLayout v-else-if="error?.statusCode === 401" name="public">
    <main class="flex h-screen items-center justify-center overflow-hidden">
      <section class="grid max-w-4xl grid-cols-1 gap-9">
        <img
          src="~/assets/images/not-found.svg"
          alt="Ilustrasi halaman tidak ditemukan"
          width="212"
          height="216"
          class="mx-auto mb-9 h-[216px] w-[212px] object-contain"
        />
        <div>
          <h1
            class="mb-2 text-center font-inter text-4xl font-bold text-gray-900"
          >
            Wah, Kamu Nyasar!
          </h1>
          <p class="text-center font-inter text-base font-normal text-gray-500">
            Sepertinya kamu tersesat di halaman yang butuh izin tambahan. Tapi
            tak perlu cemas, kamu hanya perlu log in atau otentikasi sesuai
            petunjuk, dan kami akan memberimu kunci untuk masuk!
          </p>
        </div>
        <div class="flex justify-center">
          <BaseButton
            type="link"
            variant="primary"
            external
            :to="config.public.portalJabarCMSBaseURL"
          >
            Login ke CMS
          </BaseButton>
        </div>
      </section>
    </main>
  </NuxtLayout>

  <div v-else class="p-8">
    <h1 class="text-3xl font-bold">{{ error }}</h1>
    <button @click="handleError">Clear errors</button>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    error: {
      type: Object,
      default: null,
    },
  })

  const config = useRuntimeConfig()

  const handleError = () => clearError({ redirect: '/' })
</script>

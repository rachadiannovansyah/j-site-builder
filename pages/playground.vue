<template>
  <main class="mx-auto max-w-xl py-20">
    <h1 class="text-lg">Buttons</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <UButton>Default</UButton>
      <UButton variant="outline">Default</UButton>
      <UButton color="red">Default</UButton>
      <UButton color="red" variant="outline">Default</UButton>
      <UButton block>Default</UButton>
    </div>

    <h1 class="text-lg">Link Button</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <UButton to="/">Home</UButton>
      <UButton to="https://google.com" target="_blank" variant="outline">
        Google
      </UButton>
      <UButton color="red" variant="outline" @click="$router.back()">
        Kembali
      </UButton>
    </div>

    <h1 class="text-lg">Input Text</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <BaseInput label="Masukkan Judul" placeholder="Masukkan Judul..." />
      <BaseInput
        label="Masukkan Nama"
        placeholder="Input nama Anda"
        :errors="['Tidak boleh mengandung Angka!']"
      />
      <BaseInput
        label="Masukkan Password"
        placeholder="Input password Anda"
        type="password"
        :errors="['Password yang Anda masukkan Salah!']"
      />
      <BaseInput label="Masukkan URL" placeholder="Input URL Anda">
        <template #leading>
          <NuxtIcon
            name="common/globe"
            class="text-xl text-gray-600"
            aria-hidden="true"
          />
        </template>
      </BaseInput>
    </div>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'public',
  })
</script>

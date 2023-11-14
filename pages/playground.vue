<template>
  <main class="mx-auto max-w-xl py-20">
    <h1>Buttons</h1>
    <div class="flex flex-wrap gap-x-8 gap-y-8 py-4">
      <UButton>Default</UButton>
      <UButton variant="outline">Default</UButton>
      <UButton color="red">Default</UButton>
      <UButton color="red" variant="outline">Default</UButton>
      <UButton block>Default</UButton>
    </div>
    <h1>Link Button</h1>
    <div class="flex flex-wrap gap-x-8 gap-y-8 py-4">
      <UButton to="/">Home</UButton>
      <UButton to="https://google.com" target="_blank" variant="outline">
        Google
      </UButton>
      <UButton color="red" variant="outline" @click="$router.back()">
        Kembali
      </UButton>
    </div>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'public',
  })
</script>

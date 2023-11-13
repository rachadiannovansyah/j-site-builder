<template>
  <div class="h-[2000px] p-8">
    <h1 class="text-3xl">Jds Builder</h1>

    <BaseInput v-model="text" placeholder="Testing....">
      <template #trailing>
        <BaseButton>Cari</BaseButton>
      </template>
    </BaseInput>

    <p>{{ text }}</p>

    <button @click="clearError">Clear Error</button>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Beranda',
  })

  const text = ref('')
  const inputError = ref([
    'Terjadi Kesalahan',
    'Terjadi Kesalahan',
    'Terjadi Kesalahan',
  ])

  function clearError() {
    inputError.value = []
  }
</script>

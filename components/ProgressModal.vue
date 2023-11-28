<template>
  <BaseModal :open="props.open" :header="props.title" prevent-close>
    <p class="text-center text-sm leading-6 text-blue-gray-800">
      {{ props.message }}
    </p>
    <template #footer>
      <progress max="100" :value="props.value" />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  const props = defineProps({
    open: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: 'Sedang diproses',
    },
    message: {
      type: String,
      default: 'Mohon tunggu, sedang diproses',
    },
  })
</script>

<style scoped>
  progress {
    width: 100%;
  }
  progress::-webkit-progress-bar {
    background-color: #069550;
    border-radius: 4px;
  }
  progress::-moz-progress-bar {
    background-color: #069550;
    border-radius: 4px;
  }
  progress::-webkit-progress-value {
    background-color: #069550;
    border-radius: 4px;
    -webkit-transition: width 0.2s ease;
    -moz-transition: width 0.2s ease;
    -o-transition: width 0.2s ease;
    transition: width 0.2s ease;
  }
</style>

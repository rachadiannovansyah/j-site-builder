<template>
  <BaseModal
    :open="props.open"
    :header="props.title"
    prevent-close
    :modal-ui="{
      width: 'sm:max-w-[533px]',
    }"
  >
    <p class="text-center text-sm leading-6 text-blue-gray-800">
      {{ props.message }}
    </p>
    <template #footer>
      <UProgress :value="props.value" :max="100" />
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

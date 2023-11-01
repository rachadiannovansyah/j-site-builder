<template>
  <DialogTitle
    as="h3"
    class="mt-[10px] flex justify-center px-6 py-2 font-roboto text-xl font-medium leading-8 text-green-800"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
  import { DialogTitle } from '@headlessui/vue'
</script>

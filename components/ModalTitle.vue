<template>
  <DialogTitle
    as="h3"
    class="pl-6 pr-16 pt-4 font-roboto text-xl font-medium leading-8 text-green-800"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
  import { DialogTitle } from '@headlessui/vue'
</script>

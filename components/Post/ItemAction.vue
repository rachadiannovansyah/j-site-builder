<template>
  <Popover>
    <PopoverButton class="relative">
      <NuxtIcon
        name="common/vertical-dots"
        class="text-xl text-gray-600"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 mt-3 -translate-x-1/2 transform px-4">
        <div
          class="w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5"
        >
          <slot />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>

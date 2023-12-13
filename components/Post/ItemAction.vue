<template>
  <UPopover :open="isOpenListAction" :popper="{ placement: 'bottom-end' }">
    <UButton color="transparent" variant="ghost" @click="toggleOpenModal">
      <NuxtIcon
        name="common/vertical-dots"
        class="text-xl text-gray-600"
        aria-hidden="true"
      />
    </UButton>
    <template #panel>
      <div class="p-2">
        <slot />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
  const isOpenListAction = ref(false)

  function toggleOpenModal() {
    isOpenListAction.value = !isOpenListAction.value
  }
</script>

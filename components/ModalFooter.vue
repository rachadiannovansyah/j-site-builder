<template>
  <div
    :class="{
      'flex items-center gap-4 bg-gray-50 px-6 py-4': true,
      'justify-center': props.position === 'center',
      'justify-start': props.position === 'left',
      'justify-end': props.position === 'right',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  type PositionTypes = 'center' | 'left' | 'right'

  const props = defineProps({
    position: {
      type: String as () => PositionTypes,
      default: 'center',
    },
  })
</script>

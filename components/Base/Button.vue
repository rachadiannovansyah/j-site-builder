<template>
  <button
    v-bind="$attrs"
    :class="{
      'flex h-[38px] min-w-fit rounded-lg border font-lato text-sm font-bold leading-none transition-colors ease-in': true,
      'border-transparent bg-green-700 px-4 py-[10px] text-white hover:bg-green-500':
        props.variant === 'primary',
      'border-green-700 bg-transparent px-4 py-[10px] text-green-700 hover:bg-green-50':
        props.variant === 'secondary',
      'border-transparent bg-transparent px-4 py-[10px] text-green-700 hover:bg-green-50':
        props.variant === 'tertiary',
      'border-transparent bg-transparent text-green-700 hover:bg-green-50':
        props.variant === 'tertiary-paddingless',
    }"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  type IButtonVariant =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-paddingless'

  const props = defineProps({
    variant: {
      type: String as PropType<IButtonVariant>,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['click'])
</script>

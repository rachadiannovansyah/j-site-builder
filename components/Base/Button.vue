<template>
  <button
    v-if="props.type === 'button'"
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
      [disabledClass]: props.disabled,
    }"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>

  <NuxtLink
    v-else
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
      [disabledClass]: props.disabled,
    }"
    :disabled="props.disabled"
  >
    <slot></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
  type IButtonVariant =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-paddingless'

  type IButtonType = 'button' | 'link'

  const props = defineProps({
    type: {
      type: String as PropType<IButtonType>,
      default: 'button',
    },
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

  const disabledClass = computed<string>(() => {
    switch (props.variant) {
      case 'primary':
        return '!bg-gray-500 hover:!bg-gray-500 cursor-not-allowed'
      case 'secondary':
        return '!border-gray-500 !text-gray-500 hover:!bg-gray-50 cursor-not-allowed'
      case 'tertiary':
      case 'tertiary-paddingless':
        return '!text-gray-500 hover:!bg-gray-50 cursor-not-allowed'
      default:
        return ''
    }
  })
</script>

<template>
  <div class="flex w-full flex-col gap-y-2">
    <div>
      <p
        v-show="props.label"
        :class="{
          'mb-1 font-lato text-[0.9375rem] leading-6 text-gray-800': true,
          'text-red-700': hasError,
        }"
      >
        {{ props.label }}
      </p>

      <UInput
        v-model="mInput"
        :placeholder="props.placeholder"
        :type="props.type"
        :color="hasError ? 'red' : 'white'"
        :disabled="props.disabled"
      >
        <template v-if="$slots.leading" #leading>
          <slot name="leading" />
        </template>
        <template v-if="$slots.trailing" #trailing>
          <slot name="trailing" />
        </template>
      </UInput>
    </div>

    <div v-show="hasError" class="flex flex-col gap-y-2">
      <span
        v-for="(error, index) in props.errors"
        :key="`input-error-${index}`"
        class="font-lato text-xs leading-none text-red-700"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  type IInputType = 'text' | 'password' | 'email'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    // eslint-disable-next-line vue/require-prop-types
    type: {
      label: String as PropType<IInputType>,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const mInput = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const hasError = computed<boolean>(() => {
    return Array.isArray(props.errors) && props.errors.length > 0
  })
</script>

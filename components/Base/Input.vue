<template>
  <div class="flex w-full flex-col gap-y-2">
    <div>
      <p
        :class="{
          'mb-1 font-lato text-base leading-6 text-gray-800': true,
          'text-red-700': hasError,
        }"
      >
        {{ props.label }}
      </p>

      <UInput
        v-model="input"
        :placeholder="props.placeholder"
        :loading="props.loading"
        :type="props.type"
        :color="hasError ? 'red' : 'white'"
        @input="$emit('update:modelValue', $event.target.value)"
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
    loading: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: null,
    },
  })

  defineEmits(['update:modelValue'])

  const input = ref('')

  const hasError = computed(() => {
    return Array.isArray(props.errors) && props.errors.length > 0
  })
</script>

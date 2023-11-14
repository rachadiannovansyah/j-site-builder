<template>
  <div class="flex w-full flex-col gap-y-2">
    <div>
      <p
        :class="{
          'mb-1 font-lato text-base leading-6 text-gray-800': true,
          'text-red-700': hasError,
        }"
      >
        {{ label }}
      </p>
      <UInput
        v-model="mValue"
        :placeholder="placeholder"
        :color="hasError ? 'red' : 'primary'"
        :loading="props.loading"
        :type="type"
      />
    </div>

    <div v-show="hasError" class="flex flex-col gap-y-2">
      <span
        v-for="(error, index) in errors"
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
    value: {
      type: String,
      default: null,
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
    loading: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: null,
    },
  })

  const emit = defineEmits(['input'])

  const mValue = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('input', value)
    },
  })

  const hasError = computed(() => {
    return Array.isArray(props.errors) && props.errors.length > 0
  })
</script>

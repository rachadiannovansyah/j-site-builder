<template>
  <div class="flex flex-col gap-y-2">
    <UInput
      v-model="mValue"
      v-bind="$attrs"
      size="md"
      padding="sm"
      :ui="UI"
      :color="hasError ? 'red' : 'primary'"
      :loading="props.loading"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>
      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </UInput>

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
  const UI = {
    rounded: 'rounded-lg',
    placeholder: 'text-gray-500',
    color: {
      white: {
        outline: 'shadow-none font-lato text-gray-800',
      },
    },
    padding: {
      sm: 'px-2.5 py-2',
    },
  }

  const props = defineProps({
    value: {
      type: String,
      default: null,
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

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
      <p class="mb-1 font-lato text-[13px] leading-[23px] text-gray-600">
        {{ props.helper }}
      </p>
      <div v-show="hasError" class="flex flex-col gap-y-2">
      <span
        v-for="(error, index) in props.errors"
        :key="`input-error-${index}`"
        class="font-lato text-[13px] leading-[19px] font-normal text-red-700"
      >
        {{ error }}
      </span>
    </div>
      <UCheckbox
        v-model="mValue" 
        :disabled="disabled"
        :required="required"
        :indeterminate="indeterminate"
      />
    </div>

    
    
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Array,
    default: null
  },
  helper: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
})

const mValue = computed({
  get() {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const emit = defineEmits(['update:modelValue'])

const hasError = computed(() => {
   return Array.isArray(props.errors) && props.errors.length > 0
})


</script>
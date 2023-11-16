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
      <UTextarea
        v-model="mValue"
        :autofocus="autofocus"
        :autoresize="autoresize"
        :color="hasError ? 'red' : 'white'"
        :disabled="disabled"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :resize="resize"
        :rows="rows"
        :size="size"
      />
    </div>

    <div v-show="hasCountCharacters" class="flex flex-col gap-y-2">
      <p class="font-lato text-[13px] leading-[19px] font-normal text-gray-600">
        Sisa karakter: {{ countCharacter }} dari {{  props.maxLength }}
      </p>
    </div>
    <div v-show="hasError" class="flex flex-col gap-y-2">
      <span
        v-for="(error, index) in props.errors"
        :key="`input-error-${index}`"
        class="font-lato text-[13px] leading-[19px] font-normal text-red-700"
      >
        {{ error }}
      </span>
    </div>
    
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  autofocus: {
    type: Boolean,
    default: true
  },
  autoresize: {
    type: Boolean,
    default: false
  },
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
  maxLength: {
    type: Number,
    default: null
  },
  modelValue: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  resize: {
    type: Boolean,
    default: true
  },
  rows: {
    type: Number,
    default: 10
  },
  size: {
    type: String,
    default: null
  }
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

const hasCountCharacters = computed(() => {
  return !!(props.maxLength !== null && props.modelValue.length >= 0)
})

const countCharacter = computed(() => {
  return props.modelValue.length
})

</script>
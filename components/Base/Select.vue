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
      <p
        :class="{
          'mb-1 font-lato text-[13px] leading-[23px] text-gray-600': true,
          'text-red-700': hasError,
        }"
      >
        {{ props.helper }}
      </p>
      <USelectMenu
        v-model="mSelected"
        :color="hasError ? 'red' : 'white'"
        :searchable="searchable"      
        :placeholder="placeholder"
        searchable-placeholder="Cari.."
        :multiple="multiple"
        :loading="loading"
        :disabled="disabled"
        :creatable="creatable"
        :options="props.options"

      >
        <template v-if="$slots.label" #label>
          <slot name="label" />
        </template>
        <template v-if="$slots.option" #option>
          <slot name="option" />
        </template>
        <template v-if="$slots['option-empty']" #option-empty="{ query }">
          <slot name="option-empty" :query="query" />
        </template>
        <template v-if="$slots['option-create']" #option-create>
          <slot name="option-create" />
        </template>
      </USelectMenu>
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

const props = defineProps({
  options: {
    type: Array as PropType <string[]>,
    default: () => ([])
  },
  searchable: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  helper: {
    type: String,
    default: ''
  },
  errors: {
    type: Array,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  creatable: {
    type: Boolean,
    default: false
  },
})

const mSelected = computed({
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
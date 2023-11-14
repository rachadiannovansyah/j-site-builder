<template>
  <div class="flex w-full flex-col gap-y-2">
    <p v-show="label" class="mb-1 font-lato text-base leading-6 text-gray-800">
      {{ props.label }}
    </p>
    <UInput
      v-model="input"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      :placeholder="props.placeholder"
      icon="i-heroicons-magnifying-glass-solid"
      autocomplete="off"
      color="white"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <template #trailing>
        <UButton
          v-show="input !== ''"
          variant="link"
          color="gray"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="$emit('clear')"
        />
      </template>
    </UInput>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  })

  defineEmits(['update:modelValue', 'clear'])

  const input = ref('')
</script>

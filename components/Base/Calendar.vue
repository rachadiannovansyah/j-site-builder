<template>
  <DatePicker
    v-model="date"
    trim-weeks
    color="green"
    :attributes="attrs"
    :masks="masks"
    :first-day-of-week="2"
    :popover="popover"
  >
    <template #default="{ inputValue, inputEvents }">
      <UInput
        placeholder="DD/MM/YYYY"
        :model-value="inputValue"
        v-on="inputEvents"
      >
        <template #trailing>
          <img
            src="@/assets/icons/common/calendar.svg"
            width="16"
            height="16"
            alt="ikon kalendar"
          />
        </template>
      </UInput>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
  import { DatePicker } from 'v-calendar'
  import 'v-calendar/dist/style.css'

  const props = defineProps({
    modelValue: {
      type: Date,
      default: null,
    },
  })

  const emit = defineEmits(['update:model-value', 'close'])

  const date = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:model-value', value)
      emit('close')
    },
  })

  const popover = {
    visibility: 'click',
  }

  const masks = ref({
    weekdays: 'WW',
    input: 'DD/MM/YYYY',
    data: ['DD/MM/YYYY'],
  })

  const attrs = [
    {
      content: {
        style: {
          fontWeight: 'bold',
        },
      },
      dates: [new Date()],
    },
  ]
</script>

<style>
  /* Override global css for v-calendar */

  .vc-container .weekday-1 {
    color: #d32f2f;
  }
</style>

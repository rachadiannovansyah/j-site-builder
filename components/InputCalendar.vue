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
      <div>
        <p
          v-show="props.label"
          :class="{
            'mb-1 font-lato text-[0.9375rem] leading-6 text-gray-800': true,
            'text-red-700': false,
          }"
        >
          {{ props.label }}
        </p>
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
      </div>
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
    label: {
      type: String,
      default: 'null',
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

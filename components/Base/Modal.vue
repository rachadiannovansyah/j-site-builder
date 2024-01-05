<template>
  <UModal
    v-model="mOpen"
    :ui="props.modalUi"
    :prevent-close="props.preventClose"
    :overlay="props.overlay"
  >
    <UCard :ui="props.cardUi">
      <template #header>
        <slot name="header">
          <div class="flex items-center justify-between">
            <h3
              class="font-roboto text-xl font-medium leading-8 text-green-800"
              data-cy="j-site-modal__header"
            >
              {{ props.header }}
            </h3>
            <UButton
              v-if="props.withCloseButton"
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              data-cy="j-site-modal__button-close"
              @click="$emit('close')"
            />
          </div>
        </slot>
      </template>

      <slot></slot>

      <template #footer>
        <section
          :class="{
            'flex items-center gap-x-4': true,
            'justify-end': props.buttonPosition === 'right',
            'justify-start': props.buttonPosition === 'left',
            'justify-center': props.buttonPosition === 'center',
            'justify-between': props.buttonPosition === 'between',
          }"
        >
          <slot name="footer"></slot>
        </section>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  type IPositionType = 'center' | 'left' | 'right' | 'between'

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    withCloseButton: {
      type: Boolean,
      default: false,
    },
    preventClose: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    header: {
      type: String,
      default: '',
    },
    modalUi: {
      type: Object,
      default: () => ({}),
    },
    cardUi: {
      type: Object,
      default: () => ({}),
    },
    buttonPosition: {
      type: String as PropType<IPositionType>,
      default: 'center',
    },
  })

  const mOpen = computed({
    get() {
      return props.open
    },
    set() {
      emit('close')
    },
  })

  const emit = defineEmits(['close'])
</script>

<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog
      as="div"
      class="relative z-10"
      :unmount="true"
      @close="$emit('close')"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-20"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-20"
          >
            <DialogPanel
              :class="`translate-y relative grid max-h-[90vh] w-full ${maxWidth} transform grid-cols-1 overflow-auto rounded-xl bg-white transition-all`"
            >
              <button
                v-if="props.withCloseButton"
                class="absolute right-6 top-4 flex items-center justify-center overflow-hidden rounded-full transition-colors ease-in hover:bg-gray-100"
                @click="$emit('close')"
              >
                <NuxtIcon
                  name="common/close"
                  class="text-4xl text-gray-800"
                  aria-hidden="true"
                />
              </button>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
  } from '@headlessui/vue'

  defineEmits(['close'])

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    withCloseButton: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: 'max-w-xl',
    },
  })
</script>

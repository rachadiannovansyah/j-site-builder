<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[870px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-4 sm:px-6',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-end">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            data-cy="j-site-page-type__button-close"
            @click="$emit('close')"
          />
        </div>
      </template>
      <section>
        <h1
          class="mb-5 text-center font-inter text-[26px] font-bold leading-[60px] text-blue-gray-900"
        >
          Pilih templat halaman yang ingin kamu buat !
        </h1>
        <div class="flex h-full w-full items-center justify-center gap-[5px]">
          <RadioGroup v-model="selected">
            <div class="flex flex-col gap-4">
              <RadioGroupOption
                v-for="(type, index) in PAGE_TYPES"
                :key="index"
                v-slot="{ checked }"
                as="template"
                :value="type"
                :disabled="true"
                :data-cy="`j-site-page-type__option-${type
                  ?.toLowerCase()
                  .replaceAll(' ', '-')}`"
              >
                <div
                  :class="[
                    checked ? 'cursor-pointer ring-2 ring-green-700' : '',
                  ]"
                  class="relative flex w-[310px] rounded-[32px] border border-gray-300 bg-white px-6 py-3 focus:outline-none"
                >
                  <div class="flex w-full justify-between">
                    <div class="relative flex items-center gap-[25px]">
                      <div class="flex max-w-[359px] flex-col gap-2 text-left">
                        <RadioGroupLabel
                          as="p"
                          :class="{
                            'font-inter text-base font-semibold': true,
                            'text-green-700': checked,
                          }"
                        >
                          {{ type }}
                        </RadioGroupLabel>
                      </div>
                    </div>
                    <div
                      v-if="checked"
                      class="absolute right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-green-700 p-1"
                    >
                      <div
                        class="h-[13px] w-[13px] rounded-full bg-green-700"
                      />
                    </div>
                  </div>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
          <div class="h-[409px] w-[249px] overflow-hidden">
            <img
              src="/images/select-page-type-ilustration.svg"
              alt="Ilustrasi Pilih Tipe Halaman"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <template #footer>
        <section class="flex justify-end gap-x-4">
          <UButton
            variant="outline"
            data-cy="j-site-page-type__button-cancel"
            @click="$emit('close')"
          >
            Batal
          </UButton>
          <UButton
            data-cy="j-site-page-type__button-next"
            @click="$emit('next')"
          >
            Selanjutnya
            <template #trailing>
              <NuxtIcon
                name="common/arrow-right"
                aria-hidden="true"
                class="text-[20px]"
              />
            </template>
          </UButton>
        </section>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from '@headlessui/vue'

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const PAGE_TYPES = [
    'Home',
    'Profile OPD',
    'Layanan',
    'Informasi',
    'Publikasi',
    'PPID',
  ]

  const pageStore = usePageStore()
  const selected = computed({
    get() {
      return PAGE_TYPES[0]
    },
    set(value) {
      pageStore.setPageType(value)
    },
  })

  const isOpen = computed(() => {
    return props.open
  })

  watch(
    isOpen,
    () => {
      if (isOpen && !pageStore.builderConfig.type) {
        pageStore.setPageType(PAGE_TYPES[0])
      }
    },
    { immediate: true },
  )

  defineEmits(['close', 'next'])
</script>

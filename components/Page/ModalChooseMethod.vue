<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[620px]' }"
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
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Pilih Tipe Halaman
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section class="flex flex-col gap-[15px]">
        <RadioGroup
          v-model="selected"
          @change="$emit('change:select', selected)"
        >
          <div class="flex flex-col gap-[10px]">
            <RadioGroupOption
              v-for="method in PAGE_METHODS"
              :key="method.title"
              v-slot="{ checked }"
              as="template"
              :value="method"
              :disabled="true"
            >
              <div
                :class="[
                  checked
                    ? 'cursor-pointer bg-green-50 ring-2 ring-green-700'
                    : 'bg-white ',
                ]"
                class="relative flex rounded-lg px-5 py-4 shadow-md focus:outline-none"
              >
                <div class="flex w-full justify-between">
                  <div class="relative flex items-center gap-[25px]">
                    <div
                      class="h-[75px] w-[135px] overflow-hidden rounded-md bg-[#F1F1F1]"
                    >
                      <img
                        :src="method.img"
                        alt="Ilustrasi Opsi Halaman Hemplat"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <div class="flex max-w-[359px] flex-col gap-2 text-left">
                      <RadioGroupLabel
                        as="p"
                        class="font-inter text-base font-semibold"
                      >
                        {{ method.title }}
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        class="font-lato text-sm text-gray-600"
                      >
                        {{ method.desc }}
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <div
                    v-if="checked"
                    class="absolute right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-green-700 p-1"
                  >
                    <div class="h-[13px] w-[13px] rounded-full bg-green-700" />
                  </div>
                  <div
                    v-if="!checked"
                    class="absolute right-2 h-[22px] w-[22px] rounded-full border border-gray-500"
                  />
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </section>

      <template #footer>
        <section class="flex justify-end gap-x-4">
          <UButton variant="outline" @click="$emit('close')"> Batal </UButton>
          <UButton @click="$emit('next')">
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
    RadioGroupDescription,
  } from '@headlessui/vue'

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const PAGE_METHODS = [
    {
      title: 'Halaman Templat',
      desc: 'Kemudahan pengaturan halaman yang cepat. Anda hanya perlu mengisi konten dari halaman.',
      img: '/images/page-option-template.svg',
    },
    {
      title: 'Halaman Kosong',
      desc: 'Kustomisasi penuh halaman sesuai kebutuhan. Anda dapat mengatur tata letak, widget, dan konten dari halaman.',
      img: '/images/page-option-empty.svg',
    },
  ]

  const selected = ref(PAGE_METHODS[0])

  defineEmits(['close', 'next', 'change:select'])
</script>

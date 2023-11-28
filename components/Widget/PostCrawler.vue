<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[920px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-4 sm:px-6',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Setup Tampilan Post
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section class="grid grid-cols-1 gap-y-6">
        <div class="flex flex-col gap-3 px-12">
          <p class="font-base font-lato font-medium text-gray-800">
            Pilih Kombinasi
          </p>
          <RadioGroup v-model="selectedPostType" class="flex gap-4">
            <RadioGroupOption
              v-for="(type, index) in POST_SORT_TYPE"
              :key="index"
              v-slot="{ checked }"
              :value="type.value"
            >
              <div
                :class="{
                  'flex h-[54px] w-[200px] rounded-[27px] border border-gray-300 bg-white px-3 py-1.5 focus:outline-none': true,
                  'cursor-pointer ring-1 ring-green-700': checked,
                }"
              >
                <div class="flex w-full items-center justify-between">
                  <RadioGroupLabel
                    class="text-left font-lato text-sm font-medium text-gray-900"
                  >
                    {{ type.label }}
                  </RadioGroupLabel>
                  <div
                    v-if="checked"
                    class="flex h-[22px] w-[22px] items-center justify-center"
                  >
                    <NuxtIcon
                      name="common/check-circle"
                      class="text-lg text-green-700"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </RadioGroup>
        </div>

        <div class="flex flex-col gap-3 px-12">
          <p class="font-base font-lato font-medium text-gray-800">
            Pilih Format Tampilan
          </p>
          <RadioGroup
            v-model="selectedPostFormat"
            class="flex justify-center gap-4"
          >
            <RadioGroupOption
              v-for="(format, index) in POST_FORMAT_DISPLAY"
              :key="index"
              v-slot="{ checked }"
              :value="format.value"
              class="flex flex-col items-center justify-center gap-3"
            >
              <div
                :class="{
                  'flex h-[124px] w-[210px] rounded-[14px] border border-gray-300 bg-white p-3 focus:outline-none': true,
                  'cursor-pointer ring-2 ring-green-700': checked,
                }"
              >
                <NuxtImg
                  :src="format.icon"
                  width="186"
                  height="100"
                  class="h-[100px] w-[186px] object-cover object-center"
                  :alt="`Ilustrasi ${format.label}`"
                />
              </div>
              <RadioGroupLabel
                :class="{
                  'text-left font-lato text-base font-bold text-gray-700': true,
                  'text-green-700': checked,
                }"
              >
                {{ format.label }}
              </RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
        </div>

        <div
          class="mb-4 flex max-h-[311px] w-full min-w-0 items-center justify-center overflow-y-auto rounded-[14px] border border-gray-300 bg-[#F9F9F9] p-2.5 px-6"
        >
          <template v-if="selectedPostFormat">
            {{ selectedPostFormat }}
          </template>

          <template v-else>
            <div
              class="flex w-full flex-col items-center justify-center gap-[10px]"
            >
              <NuxtImg
                src="/images/post/no-format-display-selected.svg"
                width="220"
                height="220"
                class="object-cover object-center"
                alt="Ilustrasi tidak ada format post terpilih"
              />
              <h1 class="font-roboto text-[21px] font-medium text-gray-900">
                Pilih Format Tampilan terlebih dahulu
              </h1>
            </div>
          </template>
        </div>
      </section>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from '@headlessui/vue'

  const POST_SORT_TYPE = [
    {
      label: 'Terpopuler',
      value: 'views',
    },
    {
      label: 'Terupdate',
      value: 'published_at',
    },
  ]
  const POST_FORMAT_DISPLAY = [
    {
      label: 'Thumbnail View',
      value: 'thumbnail',
      icon: '/images/post/thumbnail-view.svg',
    },
    {
      label: 'List View',
      value: 'list',
      icon: '/images/post/list-view.svg',
    },
    {
      label: 'Bar View',
      value: 'bar',
      icon: '/images/post/bar-view.svg',
    },
  ]

  const selectedPostType = ref('')
  const selectedPostFormat = ref('')

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['close'])
</script>

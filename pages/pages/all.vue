<template>
  <section
    class="flex h-full w-full flex-col gap-4 rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
  >
    <div class="mb-8 flex items-start justify-between sm:flex-wrap">
      <div class="flex gap-8">
        <SearchBar placeholder="Cari Halaman" />
        <FilterBar />
      </div>
      <BaseButton
        v-if="!state.isEmptyData"
        variant="primary"
        class="flex gap-2"
        @click="state.isMethodeModalOpen = true"
      >
        <NuxtIcon
          name="common/plus"
          class="text-lg text-white"
          aria-hidden="true"
        />
        <p>Buat Halaman Baru</p>
      </BaseButton>
    </div>
    <div class="flex h-full w-full flex-col items-center justify-center">
      <NoData
        title="Kamu belum memiliki halaman !"
        description="Tenang saja, kita siap membantu kamu memulainya dengan informasi konten
      halaman yang menakjubkan!"
      >
        <BaseButton
          v-if="state.isEmptyData"
          variant="primary"
          class="flex gap-2"
          @click="state.isMethodeModalOpen = true"
        >
          <NuxtIcon
            name="common/plus"
            class="text-lg text-white"
            aria-hidden="true"
          />
          <p>Membuat Halaman</p>
        </BaseButton>
      </NoData>
    </div>
  </section>

  <!-- Modal Metode Halaman -->
  <BaseModal
    :open="state.isMethodeModalOpen"
    :with-close-button="true"
    max-width="max-w-[620px]"
    @close="onClose"
  >
    <ModalTitle class="flex justify-between"> Pilih tipe Halaman </ModalTitle>
    <ModalBody class="flex flex-col gap-[15px] px-[25px] py-[15px]">
      <RadioGroup v-model="state.selectedMethods">
        <div class="flex flex-col gap-[10px]">
          <RadioGroupOption
            v-for="methode in methods"
            :key="methode.title"
            v-slot="{ checked }"
            as="template"
            :value="methode"
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
                      :src="methode.img"
                      alt="Ilustrasi Opsi Halaman Hemplat"
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <div class="flex max-w-[359px] flex-col gap-2 text-left">
                    <RadioGroupLabel
                      as="p"
                      class="font-inter text-base font-semibold"
                    >
                      {{ methode.title }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      class="font-lato text-sm text-gray-600"
                    >
                      {{ methode.desc }}
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
    </ModalBody>
    <ModalFooter position="right">
      <BaseButton variant="secondary" @click="onClose"> Batal </BaseButton>
      <BaseButton
        variant="primary"
        class="flex items-center gap-2"
        @click="onMethodeClick"
      >
        <p>Selanjutnya</p>
        <NuxtIcon
          name="common/arrow-right"
          aria-hidden="true"
          class="text-[20px]"
        />
      </BaseButton>
    </ModalFooter>
  </BaseModal>

  <!-- Modal Tipe Halaman -->
  <BaseModal
    :open="state.isTypeModalOpen"
    :with-close-button="true"
    max-width="max-w-[870px]"
    @close="onClose"
  >
    <ModalBody class="mb-5 mt-12 flex flex-col gap-[15px] px-[25px] py-[15px]">
      <h1
        class="text-center font-inter text-[26px] font-bold leading-[60px] text-blue-gray-900"
      >
        Pilih templat halaman yang ingin kamu buat !
      </h1>
      <div class="flex h-full w-full items-center justify-center gap-[5px]">
        <RadioGroup v-model="state.selectedPageType">
          <div class="flex flex-col gap-4">
            <RadioGroupOption
              v-for="(page, index) in pages"
              :key="index"
              v-slot="{ checked }"
              as="template"
              :value="page"
              :disabled="true"
            >
              <div
                :class="[checked ? 'cursor-pointer ring-2 ring-green-700' : '']"
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
                        {{ page }}
                      </RadioGroupLabel>
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
        <div class="h-[409px] w-[249px] overflow-hidden">
          <img
            src="/images/select-page-type-ilustration.svg"
            alt="Ilustrasi Pilih Tipe Halaman"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </ModalBody>
    <ModalFooter position="right">
      <BaseButton variant="secondary" @click="onClose"> Batal </BaseButton>
      <BaseButton
        variant="primary"
        class="flex items-center gap-2"
        @click="onTypeClick"
      >
        <p>Selanjutnya</p>
        <NuxtIcon
          name="common/arrow-right"
          aria-hidden="true"
          class="text-[20px]"
        />
      </BaseButton>
    </ModalFooter>
  </BaseModal>
</template>

<script setup lang="ts">
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  } from '@headlessui/vue'

  definePageMeta({
    title: 'Halaman',
  })

  const methods = [
    {
      title: 'Halaman Templat',
      desc: 'Kemudahan pengaturan halaman yang cepat. Anda hanya perlu mengisi konten dari halaman.',
      img: '/images/page-option-template.png',
    },
    {
      title: 'Halaman Kosong',
      desc: 'Kustomisasi penuh halaman sesuai kebutuhan. Anda dapat mengatur tata letak, widget, dan konten dari halaman.',
      img: '/images/page-option-empty.png',
    },
  ]

  const pages = [
    'Home',
    'Profile OPD',
    'Layanan',
    'Informasi',
    'Publikasi',
    'PPID',
  ]

  // TODO: change state isEmptyData into data fetch
  const state = reactive({
    isEmptyData: true,
    isMethodeModalOpen: false,
    selectedMethods: methods[0],
    isTypeModalOpen: false,
    selectedPageType: pages[0],
    isTemplateModalOpen: false,
  })

  const onClose = () => {
    state.isMethodeModalOpen = false
    state.isTypeModalOpen = false
  }

  const onMethodeClick = () => {
    state.isMethodeModalOpen = false
    state.isTypeModalOpen = true
  }

  const onTypeClick = () => {
    state.isTypeModalOpen = false
    state.isTemplateModalOpen = true
  }
</script>

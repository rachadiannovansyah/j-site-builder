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
        @click="state.isPageTypeModalOpen = true"
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
          @click="state.isPageTypeModalOpen = true"
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
    :open="state.isPageMethodModalOpen"
    :with-close-button="true"
    max-width="max-w-[620px]"
    @close="onClose"
  >
    <ModalTitle class="flex justify-between"> Pilih Tipe Halaman </ModalTitle>
    <ModalBody class="flex flex-col gap-[15px] px-[25px] py-[15px]">
      <RadioGroup v-model="state.selectedPageMethod">
        <div class="flex flex-col gap-[10px]">
          <RadioGroupOption
            v-for="method in pageMethods"
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
    </ModalBody>
    <ModalFooter position="right">
      <BaseButton variant="secondary" @click="onClose"> Batal </BaseButton>
      <BaseButton
        variant="primary"
        class="flex items-center gap-2"
        @click="onPageMethodClick"
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
    :open="state.isPageTypeModalOpen"
    :with-close-button="true"
    max-width="max-w-[870px]"
    @close="onClose"
  >
    <ModalBody class="mt-12 flex flex-col gap-[15px] px-[25px] py-[15px]">
      <h1
        class="text-center font-inter text-[26px] font-bold leading-[60px] text-blue-gray-900"
      >
        Pilih templat halaman yang ingin kamu buat !
      </h1>
      <div class="flex h-full w-full items-center justify-center gap-[5px]">
        <RadioGroup v-model="state.selectedPageType">
          <div class="flex flex-col gap-4">
            <RadioGroupOption
              v-for="(type, index) in pageTypes"
              :key="index"
              v-slot="{ checked }"
              as="template"
              :value="type"
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
                        {{ type }}
                      </RadioGroupLabel>
                    </div>
                  </div>
                  <div
                    v-if="checked"
                    class="absolute right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-green-700 p-1"
                  >
                    <div class="h-[13px] w-[13px] rounded-full bg-green-700" />
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
    </ModalBody>
    <ModalFooter position="right">
      <BaseButton variant="secondary" @click="onClose"> Batal </BaseButton>
      <BaseButton
        variant="primary"
        class="flex items-center gap-2"
        @click="onPageTypeClick"
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

  <!-- Modal Template Halaman -->
  <BaseModal
    :open="state.isPageTemplateModalOpen"
    :with-close-button="true"
    max-width="max-w-[982px]"
    @close="onClose"
  >
    <ModalTitle class="flex justify-between">
      Pilih Template Halaman
    </ModalTitle>
    <ModalBody class="flex flex-col gap-[5px]">
      <RadioGroup
        v-model="state.selectedPageTemplate"
        class="flex h-full w-full flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        <RadioGroupOption
          v-for="(template, index) in state.data"
          :key="index"
          v-slot="{ checked }"
          as="template"
          :value="template"
        >
          <div class="relative flex h-[246px] w-[300px] flex-col gap-4">
            <div
              :class="[checked ? 'cursor-pointer ring-2 ring-green-700' : '']"
              class="flex h-[189px] w-[300px] items-end justify-center rounded-[9px] border border-[#F0EFF1] bg-[#F3F5F6] hover:bg-green-50"
            >
              <div
                class="h-[145px] w-[185px] overflow-hidden rounded-t-md bg-[#F1F1F1]"
              >
                <img
                  :src="template.thumbnail"
                  :alt="template.name"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
            <NuxtLink
              :to="template.preview"
              target="_blank"
              class="absolute right-2 top-2 rounded-md border border-gray-500"
            >
              <NuxtIcon
                name="common/eye"
                aria-hidden="true"
                class="text-[20px] text-gray-500"
              />
            </NuxtLink>
            <div class="flex justify-between">
              <div class="flex flex-col">
                <RadioGroupLabel
                  as="p"
                  class="font-lato text-sm font-bold capitalize text-gray-800"
                >
                  {{ template.name }}
                </RadioGroupLabel>
                <RadioGroupDescription
                  as="span"
                  class="font-lato text-[11px] text-gray-700"
                >
                  {{ countWidget(template.sections) }} konten tersedia di
                  templat ini
                </RadioGroupDescription>
              </div>
              <div class="flex h-fit items-center">
                <button
                  :class="{
                    'flex h-7 items-center justify-center rounded-lg border px-4 py-[10px] text-sm': true,
                    'border-green-700 bg-green-700 text-white': checked,
                    'border-gray-400 bg-white text-gray-800': !checked,
                  }"
                >
                  <NuxtIcon
                    v-show="checked"
                    name="common/check-circle"
                    class="pr-2 text-base"
                    filled
                    aria-hidden="true"
                  />
                  {{ checked ? 'Terpilih' : 'Pilih' }}
                </button>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </ModalBody>
    <ModalFooter position="right">
      <BaseButton variant="secondary" @click="onBackFromTemplate">
        Kembali
      </BaseButton>
      <BaseButton
        variant="primary"
        class="flex items-center gap-2"
        @click="onSelectTemplate"
      >
        <p>Mulai Buat Halaman</p>
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
  import {
    IMetaData,
    ITemplateData,
    ITemplateSection,
    ITemplateWidget,
  } from '~/repository/j-site/types/template'

  definePageMeta({
    title: 'Halaman',
  })

  const { $jSiteApi } = useNuxtApp()
  const pageStore = usePageStore()

  const pageMethods = [
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

  const pageTypes = [
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
    isPageMethodModalOpen: false,
    selectedPageMethod: pageMethods[0],
    isPageTypeModalOpen: false,
    selectedPageType: pageTypes[0],
    isPageTemplateModalOpen: false,
    selectedPageTemplate: null as null | ITemplateData,
    data: null as null | ITemplateData[],
    meta: null as null | IMetaData,
  })

  const onClose = () => {
    state.isPageMethodModalOpen = false
    state.isPageTypeModalOpen = false
    state.isPageTemplateModalOpen = false
  }

  const onBackFromTemplate = () => {
    state.isPageTypeModalOpen = true
    state.isPageTemplateModalOpen = false
  }

  const onPageMethodClick = () => {
    state.isPageMethodModalOpen = false
    state.isPageTypeModalOpen = true
  }

  const onPageTypeClick = () => {
    state.isPageTypeModalOpen = false
    state.isPageTemplateModalOpen = true
  }

  const onSelectTemplate = async () => {
    state.isPageTemplateModalOpen = false
    const newData = {
      id: state.selectedPageTemplate?.id || 0,
      name: state.selectedPageTemplate?.name || '',
      method: state.selectedPageMethod?.title || '',
      type: state.selectedPageType || '',
      updated_at: state.selectedPageTemplate?.updated_at || '',
      sections: JSON.parse(
        JSON.stringify(state.selectedPageTemplate?.sections),
      ),
    }
    pageStore.setPage(newData)
    await navigateTo({ path: '/halaman/buat' })
  }

  onMounted(() => {
    getTemplates()
  })

  async function getTemplates() {
    try {
      const response = await $jSiteApi.templates.getTemplates({
        server: false,
      })
      const resp = response.data.value
      state.data = resp?.data || null
      state.meta = resp?.meta || null
    } catch (error) {
      console.error(error)
    }
  }

  const countWidget = (item: ITemplateSection[]) => {
    return item.reduce(
      (count: number, current: { widgets: string | ITemplateWidget[] }) =>
        count + current.widgets.length,
      0,
    )
  }
</script>

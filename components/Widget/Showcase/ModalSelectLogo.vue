<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{
      width: 'md:max-w-[682px]',
      height: 'md:max-h-608px',
      base: 'ring-gray-200 ring-1',
    }"
    :overlay="false"
    as="div"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:px-6 sm:py-4',
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
            Pilih Logo
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

      <section class="flex max-h-[458px] w-full flex-col gap-6">
        <SearchBar placeholder="Cari Logo" />
        <RadioGroup
          v-model="selectedLogo"
          class="flex max-h-[296px] w-full items-center justify-center gap-4 overflow-y-auto rounded-[10px] border border-gray-100 bg-[#F9F9F9] p-[10px] sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <RadioGroupOption
            v-for="(logo, index) in logos.data"
            :key="index"
            v-slot="{ checked }"
            as="template"
            :value="logo"
          >
            <button
              :class="{
                'flex h-[130px] w-[130px] items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white': true,
                'ring-1 ring-green-400': checked,
              }"
              @click="$emit('select-logo', logo)"
            >
              <div class="flex h-[72px] w-[78px] items-center justify-center">
                <NuxtImg
                  :src="logo.file.uri"
                  alt="Portal Jabar Logo"
                  width="72"
                  height="78"
                />
              </div>
            </button>
          </RadioGroupOption>
        </RadioGroup>
        <BasePagination
          limit="8"
          :total-rows="logos.meta?.total"
          :limit-options="['5', '10', '15', '20']"
          :current-page="logos.meta?.page"
          :total-page="logos.meta?.last_page"
          @change-page="setParamsPage"
          @change-limit="setParamsLimit"
          @previous-page="onPreviousPage"
          @next-page="onNextPage"
        />
      </section>
      <template #footer>
        <section class="flex justify-end">
          <UButton :disabled="Object.keys(selectedLogo).length === 0">
            Pilih Logo
          </UButton>
        </section>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
  import { IMetaData, ILogosData } from '~/repository/j-site/types/logo'

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['close', 'select-logo'])

  const selectedLogo = ref({})

  const logos = reactive({
    data: null as null | ILogosData[],
    meta: null as null | IMetaData,
  })

  const params = reactive({
    page: 1 as string | number,
    limit: 8 as string | number,
  })

  const { $jSiteApi } = useNuxtApp()
  const { data: templatesList } = await $jSiteApi.logo.getLogos(
    { query: params },
    { server: false },
  )

  logos.data = toRaw(templatesList.value?.data) ?? null
  logos.meta = toRaw(templatesList.value?.meta) ?? null

  function setParamsLimit(limit: string | number) {
    params.limit = limit
  }

  function setParamsPage(page: string | number) {
    params.page = page
  }

  function onPreviousPage(page: string | number) {
    params.page = Number(params.page) - Number(page)
  }

  function onNextPage(page: string | number) {
    params.page = Number(params.page) + Number(page)
  }
</script>

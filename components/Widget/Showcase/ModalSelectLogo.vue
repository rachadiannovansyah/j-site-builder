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
          <h3
            class="font-roboto text-xl font-medium leading-8 text-green-800"
            data-cy="j-site-widget-showcase__modal-select-logo-header"
          >
            Pilih Logo
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            data-cy="j-site-widget-showcase__modal-select-logo-button-close"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section class="flex max-h-[458px] w-full flex-col gap-6">
        <SearchBar
          placeholder="Cari Logo"
          data-cy-suffix="showcase__modal-select-logo-input-search-logo"
          @input="onSearch($event)"
        />
        <RadioGroup v-model="selectedLogo">
          <div
            v-if="logos.data && logos.data.length > 0"
            class="widget-showcase__list-logo flex max-h-[296px] w-full items-center justify-center gap-4 overflow-y-auto rounded-[10px] border border-gray-100 bg-[#F9F9F9] p-[10px] sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
                  'flex h-[130px] w-auto items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white': true,
                  'ring-1 ring-green-400': checked,
                }"
              >
                <div class="flex h-[72px] w-[78px] items-center justify-center">
                  <NuxtImg
                    :src="logo.file.uri"
                    alt="Portal Jabar Logo"
                    width="72"
                    height="78"
                    :data-cy="`j-site-widget-showcase__modal-select-logo-image-${index}`"
                  />
                </div>
              </button>
            </RadioGroupOption>
          </div>
          <NoData v-else title="Logo tidak ditemukan !" />
        </RadioGroup>
        <BasePagination
          :limit="params.limit"
          :total-rows="logos.meta?.total"
          :limit-options="['8', '10', '15', '20']"
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
          <UButton
            :disabled="Object.keys(selectedLogo).length === 0"
            data-cy="j-site-widget-showcase__modal-select-logo-button-submit"
            @click="onSelectedLogo"
          >
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

  const emit = defineEmits(['close', 'select-logo'])

  const selectedLogo = ref({})

  const logos = reactive({
    data: null as null | ILogosData[],
    meta: null as null | IMetaData,
  })

  const params = reactive({
    page: 1 as string | number,
    limit: 8 as string | number,
    q: '' as string,
  })

  const { $jSiteApi } = useNuxtApp()

  async function fetchDataLogos() {
    const { data } = await $jSiteApi.logo.getLogos(
      { query: params },
      { server: false },
    )
    logos.data = toRaw(data.value?.data) ?? null
    logos.meta = toRaw(data.value?.meta) ?? null
  }

  onMounted(() => {
    fetchDataLogos()
  })

  function setParamsLimit(limit: string | number) {
    params.limit = limit
    params.page = 1
    fetchDataLogos()
  }

  function setParamsPage(page: string | number) {
    params.page = page
    fetchDataLogos()
  }

  function onPreviousPage() {
    params.page = Number(params.page) - 1
    fetchDataLogos()
  }

  function onNextPage() {
    params.page = Number(params.page) + 1
    fetchDataLogos()
  }

  function onSelectedLogo() {
    onSearch('')
    const data = toRaw(selectedLogo)
    emit('select-logo', toRaw(data.value))
    emit('close')
  }

  function onSearch(query: string) {
    params.q = query
    params.page = 1
    fetchDataLogos()
  }
</script>

<style scoped>
  .widget-showcase__list-logo::-webkit-scrollbar {
    width: 4px;
  }

  .widget-showcase__list-logo::-webkit-scrollbar-track {
    background-color: none;
  }

  .widget-showcase__list-logo::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: none;
    border-radius: 6px;
    background-clip: padding-box;
  }
</style>

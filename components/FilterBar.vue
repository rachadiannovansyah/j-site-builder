<template>
  <section class="flex min-w-0 items-center justify-center gap-2">
    <NuxtIcon
      name="common/filter"
      class="text-xl text-blue-gray-800"
      aria-hidden="true"
    />
    <p class="font-lato text-sm text-blue-gray-800">Filter :</p>
    <button
      :class="{
        'font-lato text-sm text-gray-600': true,
        'rounded-full bg-gray-200 px-4 py-[10px]': props.disabled,
      }"
      :disabled="props.disabled"
      @click="showFilterModal"
    >
      <div class="flex min-w-0 items-center justify-between gap-2">
        <p class="font-normal">
          {{ filterButtonLabel }}
          <span
            v-show="filterCount"
            class="h-5 w-5 rounded-full bg-red-500 text-white"
          >
            {{ filterCount }}
          </span>
        </p>
        <NuxtIcon
          name="common/chevron-down"
          class="text-lg"
          aria-hidden="true"
        />
      </div>
    </button>

    <!-- Modal Filter  -->
    <BaseModal
      :modal-ui="{
        width: 'w-[400px]',
      }"
      :open="isModalOpen"
      :overlay="false"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="font-roboto text-[16px] font-bold leading-[26px] text-gray-800"
          >
            {{ props.title }}
          </h3>
          <UButton variant="ghost"> Hapus Semua Filter </UButton>
        </div>
      </template>

      <section class="min-w-[400px]">
        <!-- Category Select Box -->
        <div class="mb-4 w-full">
          <div class="mb-4 flex w-full min-w-0 items-center gap-3">
            <h4
              class="whitespace-nowrap font-lato text-sm leading-none text-blue-gray-700"
            >
              {{ props.categoryTitle }}
            </h4>
            <span class="w-full border border-gray-100" />
          </div>

          <div class="w-full">
            <template v-if="props.categories.length > 0">
              <UCheckbox label="Pilih Semua Kategori" class="mb-3" />
              <div class="flex w-full min-w-0 flex-col gap-4 pl-[28px]">
                <UCheckbox
                  v-for="(category, index) in props.categories"
                  :key="index"
                  :label="category"
                />
              </div>
            </template>
            <template v-else>
              <div
                class="flex h-[100px] flex-col items-center justify-center gap-3"
              >
                <img
                  src="@/assets/images/no-category.svg"
                  alt="ilustrasi tampilan data kosong"
                  width="20"
                  height="20"
                />
                <p
                  class="text-center font-lato text-[14px] font-normal leading-[16px] text-blue-gray-300"
                >
                  Belum ada kategori
                </p>
              </div>
            </template>
          </div>
        </div>

        <!-- Date Input -->
        <!-- @TODO: Show date input if component is ready -->
        <div v-show="false" class="w-full">
          <div class="mb-4 flex w-full min-w-0 items-center gap-3">
            <h4
              class="whitespace-nowrap font-lato text-sm leading-none text-blue-gray-700"
            >
              Tanggal
            </h4>
            <span class="w-full border border-gray-100" />
          </div>
        </div>

        <!-- @TODO: slicing calendar -->
        <div class="w-full"></div>
      </section>

      <template #footer>
        <UButton
          :ui="{
            base: 'w-[177px] justify-center',
          }"
          variant="outline"
          @click="cancelFilter"
        >
          Batal
        </UButton>
        <UButton
          :ui="{
            base: 'w-[177px] justify-center',
          }"
          >Terapkan</UButton
        >
      </template>
    </BaseModal>
  </section>
</template>

<script lang="ts" setup>
  const filterCount = ref(0)

  const isModalOpen = ref(false)

  const props = defineProps({
    title: {
      type: String,
      default: 'Filter',
    },
    categoryTitle: {
      type: String,
      default: 'Kategori',
    },
    categories: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  })

  const filterButtonLabel = computed(() => {
    return filterCount.value > 0 ? 'Diterapkan' : 'Belum ada filter'
  })

  function showFilterModal() {
    isModalOpen.value = !isModalOpen.value
  }

  function cancelFilter() {
    showFilterModal()
  }
</script>

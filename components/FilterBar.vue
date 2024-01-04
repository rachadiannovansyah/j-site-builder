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
        'rounded-full px-4 py-[10px] font-lato text-sm': true,
        'bg-gray-200 ': props.disabled,
        'bg-green-700 text-white  hover:bg-green-600': filterCount > 0,
        'text-gray-600': filterCount === 0,
      }"
      :disabled="props.disabled"
      @click="showFilterModal"
    >
      <div class="flex min-w-0 items-center justify-between gap-2">
        <p class="font-normal">
          {{ filterButtonLabel }}
          <span
            v-show="filterCount"
            class="ml-2 rounded-md bg-red-500 p-1 text-center text-white"
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
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="font-roboto text-[16px] font-bold leading-[26px] text-gray-800"
          >
            {{ props.title }}
          </h3>
          <UButton variant="ghost" @click="resetFilter">
            Hapus Semua Filter
          </UButton>
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

          <div class="max-h-[400px] w-full overflow-y-auto">
            <template v-if="props.categories.length > 0">
              <UCheckbox
                v-model="selectedAllCategories"
                class="mb-3"
                label="Pilih Semua Kategori"
                :indeterminate="isCategoryIndeterminate"
                :checked="selectedAllCategories"
                @change="toggleSelectAll"
              />
              <div class="flex w-full min-w-0 flex-col gap-4 pl-[28px]">
                <UCheckbox
                  v-for="category in props.categories"
                  :key="category.id"
                  :label="category.name"
                  :value="category.id"
                  :checked="category.selected"
                  :model-value="category.selected"
                  @change="onChecked(category.id)"
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
        <div class="w-full">
          <div class="mb-4 flex w-full min-w-0 items-center gap-3">
            <h4
              class="whitespace-nowrap font-lato text-sm leading-none text-blue-gray-700"
            >
              Tanggal
            </h4>
            <span class="w-full border border-gray-100" />
          </div>
        </div>

        <div class="flex w-full flex-row gap-4">
          <InputCalendar
            id="start_date"
            v-model="filter.start_date"
            label="Tanggal Awal"
          />
          <InputCalendar
            id="end_date"
            v-model="filter.end_date"
            label="Tanggal Akhir"
          />
        </div>
      </section>

      <template #footer>
        <UButton
          :ui="{
            base: 'w-[223px] justify-center',
          }"
          variant="outline"
          @click="cancelFilter"
        >
          Batal
        </UButton>
        <UButton
          :ui="{
            base: 'w-[223px] justify-center',
          }"
          @click="applyFilter"
        >
          Terapkan
        </UButton>
      </template>
    </BaseModal>
  </section>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns'
  import ID from 'date-fns/locale/id'
  import { ICategoryData } from '~/repository/j-site/types/category'

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
      type: Array as PropType<ICategoryData[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits(['submit:filter'])

  const filterCount = ref(0)
  const isModalOpen = ref(false)
  const allSelected = ref(false)
  const filter = reactive({
    categories: [] as string[],
    start_date: null as Date | null,
    end_date: null as Date | null,
  })

  watch(
    () => props.categories.map((category) => category.selected),
    () => {
      const selectedCategories = props.categories.filter(
        (category) => category.selected,
      )
      allSelected.value = selectedCategories.length === props.categories.length
    },
  )

  const isCategoryIndeterminate = computed(() => {
    const selectedCategories = props.categories.filter(
      (category) => category.selected,
    )
    if (selectedCategories.length === 0) return false
    if (selectedCategories.length < props.categories.length) return true
  })

  const selectedAllCategories = computed({
    get() {
      return filter.categories.length === props.categories.length
    },
    set(value) {
      const checked = [] as string[]

      if (value) {
        props.categories.forEach((category) => {
          checked.push(category.id)
        })
      }
      filter.categories = checked
    },
  })

  const filterButtonLabel = computed(() => {
    return filterCount.value > 0 ? 'Diterapkan' : 'Belum ada filter'
  })

  function toggleSelectAll() {
    allSelected.value = !allSelected.value
    props.categories.forEach(
      (category) => (category.selected = allSelected.value),
    )
  }

  function onChecked(categoryId: string) {
    let checked: string[] = []

    const category = props.categories.find(
      (category) => category.id === categoryId,
    )

    if (category) {
      category.selected = !category.selected
    }

    checked = filter.categories.includes(categoryId)
      ? filter.categories.filter((id: string) => id !== categoryId)
      : [...filter.categories, categoryId]

    filter.categories = checked
  }

  function showFilterModal() {
    isModalOpen.value = !isModalOpen.value
  }

  function cancelFilter() {
    showFilterModal()
    resetFilter()
  }

  function updateFilterCount() {
    const count =
      filter.categories.length +
      (filter.start_date ? 1 : 0) +
      (filter.end_date ? 1 : 0)

    filterCount.value = count
  }

  function resetFilter() {
    filter.categories = []
    filter.start_date = null
    filter.end_date = null
    props.categories.filter((category) => (category.selected = false))
  }

  function formatDate(date: Date) {
    return format(new Date(date), 'yyyy-MM-dd', { locale: ID })
  }

  function applyFilter() {
    const startDate = filter.start_date
      ? formatDate(filter.start_date)
      : filter.start_date
    const endDate = filter.end_date
      ? formatDate(filter.end_date)
      : filter.end_date

    const filterParams = {
      categories: toRaw(filter.categories),
      start_date: startDate,
      end_date: endDate,
    }
    emit('submit:filter', filterParams)
    updateFilterCount()
    showFilterModal()
  }
</script>

<template>
  <div
    class="flex h-[42px] w-full border border-gray-100 border-t-green-600 bg-gray-50"
  >
    <div class="flex h-full w-fit items-center">
      <span class="w-fit px-4 font-lato text-sm leading-6 text-gray-800">
        Tampilkan
      </span>
      <div class="w-[80px] bg-white">
        <USelectMenu
          v-model="mLimit"
          size="lg"
          variant="none"
          :options="props.limitOptions"
          :ui="ui"
          :popper="{ arrow: false }"
        />
      </div>
      <span class="w-fit px-2.5 font-lato text-sm leading-6 text-gray-800">
        Item
      </span>
    </div>

    <div class="flex items-center border-l border-l-gray-200">
      <span
        class="w-fit whitespace-nowrap px-2.5 font-lato text-sm leading-6 text-gray-800"
      >
        dari Total <strong>{{ props.totalRows }}</strong>
      </span>
    </div>

    <div
      class="flex h-full w-full flex-grow items-center justify-center border-l border-r border-l-gray-200 border-r-gray-200"
    >
      <span class="w-fit px-4 font-lato text-sm leading-6 text-gray-800">
        Halaman
      </span>
      <div class="w-[80px] bg-white">
        <USelectMenu
          v-model="mCurrentPage"
          searchable
          searchable-placeholder="Cari..."
          size="lg"
          variant="none"
          :options="pageOptions"
          :ui="ui"
          :popper="{ arrow: false }"
        />
      </div>
      <span
        class="w-fit whitespace-nowrap px-4 font-lato text-sm leading-6 text-gray-800"
      >
        dari <strong>{{ props.totalPage }}</strong>
      </span>
    </div>

    <div class="full flex w-fit">
      <UButton
        variant="ghost"
        color="primary"
        icon="i-heroicons-chevron-left-20-solid"
        :ui="{ rounded: 'rounded-none' }"
        :disabled="props.currentPage <= 1"
        @click="$emit('previous-page')"
      />
      <UButton
        variant="ghost"
        color="primary"
        icon="i-heroicons-chevron-right-20-solid"
        :ui="{ rounded: 'rounded-none' }"
        :disabled="props.currentPage >= props.totalPage"
        @click="$emit('next-page')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  type IPageOptions = string[]

  const ui = {
    rounded: 'rounded-none',
    shadow: 'shadow-none',
    popper: {
      placement: 'bottom-end',
    },
  }

  const props = defineProps({
    currentPage: {
      type: Number,
      default: 0,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    totalPage: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    limitOptions: {
      type: Array as PropType<IPageOptions>,
      default: () => [],
    },
  })

  const mLimit = computed({
    get() {
      return props.limit
    },
    set(value) {
      emit('change-limit', value)
    },
  })

  const mCurrentPage = computed({
    get() {
      return props.currentPage
    },
    set(value) {
      emit('change-page', value)
    },
  })

  // Generate Array of ['1', '2', '3', ...] based on totalPage
  const pageOptions = computed((): string[] => {
    return Array.from({ length: props.totalPage }, (_, index) =>
      (index + 1).toString(),
    )
  })

  const emit = defineEmits([
    'previous-page',
    'next-page',
    'change-limit',
    'change-page',
  ])
</script>

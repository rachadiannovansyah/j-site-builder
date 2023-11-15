<template>
  <aside
    :class="{
      'mt-3 flex h-fit w-[280px] flex-col items-start justify-between gap-[14px] rounded-lg bg-white px-[14px] py-4 shadow transition-all duration-150 ease-in-out': true,
      '!h-16 !w-16 !p-[10px]': !state.isOpenSide,
    }"
  >
    <div class="flex h-full w-full justify-between">
      <div
        :class="{
          'flex h-fit w-full flex-row items-center gap-3': true,
          'justify-center !gap-0': !state.isOpenSide,
        }"
      >
        <button
          :class="{
            'mb-0 -rotate-180 rounded-md border border-gray-300 p-[6px]': true,
            'rotate-0': !state.isOpenSide,
          }"
          @click="toggleOpenSide"
        >
          <NuxtIcon
            name="common/chevron-duo-left"
            class="text-2xl text-[#393939]"
            aria-hidden="true"
          />
        </button>
        <h1
          v-show="state.isOpenSide"
          class="font-roboto text-base font-medium text-green-700"
        >
          Atribut
        </h1>
      </div>
    </div>
    <div v-show="state.isOpenSide" class="flex w-full flex-col gap-[14px]">
      <div class="flex w-full flex-col gap-1">
        <label for="title" class="font-lato text-[15px] text-blue-gray-800">
          Judul Halaman
        </label>
        <input
          v-model="state.title"
          name="title"
          type="text"
          placeholder="Homepage"
          class="w-full rounded-lg border border-blue-gray-50 bg-gray-50 p-2 text-gray-600"
        />
      </div>
      <div class="flex w-full flex-col gap-1">
        <label for="updated" class="font-lato text-[15px] text-blue-gray-800">
          Update Terakhir
        </label>
        <input
          name="updated"
          type="text"
          placeholder="12/02/2023"
          :value="props.updated"
          class="w-full rounded-lg border border-blue-gray-50 bg-gray-50 p-2 text-gray-600"
          disabled
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    updated: {
      type: String,
      default: '',
    },
  })

  const state = reactive({
    isOpenSide: true,
    title: props.title,
  })

  const toggleOpenSide = () => {
    state.isOpenSide = !state.isOpenSide
  }

  const emit = defineEmits(['update'])

  watch(
    () => state.title,
    (value) => {
      setTimeout(() => {
        emit('update', value)
      }, 1000)
    },
    { deep: true },
  )
</script>

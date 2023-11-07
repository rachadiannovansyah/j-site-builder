<template>
  <header
    :class="{
      'relative flex h-16 w-full items-center justify-between bg-white px-6 py-[10px] shadow transition-all duration-150 ease-in-out': true,
      '!w-28 rounded-lg': !state.isOpenHeader,
    }"
  >
    <div class="flex items-center justify-center">
      <img
        src="/logos/logo.svg"
        alt="Portal Jabar Logo"
        width="35"
        height="36"
      />
      <h1
        v-show="state.isOpenHeader"
        class="font-lato text-xl font-bold text-gray-900"
      >
        J-Site
      </h1>
      <button
        v-show="!state.isOpenHeader"
        class="rotate-90"
        @click="toggleOpenHeader"
      >
        <NuxtIcon
          name="common/chevron-duo-left"
          class="mb-[-2px] text-2xl text-[#393939]"
          aria-hidden="true"
        />
      </button>
    </div>
    <div
      v-show="state.isOpenHeader"
      class="flex items-center justify-between gap-14"
    >
      <div class="flex items-center justify-center gap-[10px]">
        <NuxtIcon
          name="common/globe"
          class="fill-green-500 text-base text-green-500"
          aria-hidden="true"
        />
        <span
          class="rounded-lg bg-[#F7F7F9] px-2 py-1.5 text-xs text-[#788896]"
        >
          {{ siteName }}
        </span>
      </div>
      <div class="flex items-center justify-center gap-4">
        <button
          class="flex items-center justify-center gap-2 font-lato text-sm font-bold text-green-700"
          @click="backToPage"
        >
          <NuxtIcon
            name="common/arrow-left"
            aria-hidden="true"
            class="mb-[-2px] text-xl"
          />
          <p>Kembali ke Pages</p>
        </button>
        <button
          class="font-lato text-sm font-bold text-green-700"
          @click="$emit('draft')"
        >
          Simpan Draft
        </button>
        <button
          class="flex items-center justify-center gap-2 font-lato text-sm font-bold text-green-700"
          @click="$emit('preview')"
        >
          <p>Pratinjau</p>
          <NuxtIcon
            name="common/chevron-down"
            class="mb-[-2px] text-xl"
            aria-hidden="true"
          />
        </button>
        <BaseButton class="py-[10px]" @click="$emit('publish')">
          Publish
        </BaseButton>
        <button class="-rotate-90" @click="toggleOpenHeader">
          <NuxtIcon
            name="common/chevron-duo-left"
            class="mb-[-2px] text-2xl text-[#393939]"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  defineProps({
    siteName: {
      type: String,
      default: 'www.jabarprov.go.id',
    },
  })

  const state = reactive({
    isOpenHeader: true,
  })

  defineEmits(['draft', 'preview', 'publish'])

  const toggleOpenHeader = () => {
    state.isOpenHeader = !state.isOpenHeader
  }

  const backToPage = () => {
    navigateTo({ path: '/halaman/semua' })
  }
</script>

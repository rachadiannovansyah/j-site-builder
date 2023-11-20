<template>
  <header
    :class="{
      'sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 shadow transition-all duration-150 ease-in-out': true,
      '!w-28 rounded-lg': !isOpen,
    }"
  >
    <div class="flex items-center justify-center">
      <img
        src="/logos/logo.svg"
        alt="Portal Jabar Logo"
        width="35"
        height="36"
      />
      <h1 v-show="isOpen" class="font-lato text-xl font-bold text-gray-900">
        J-Site
      </h1>
      <UButton
        v-show="!isOpen"
        variant="ghost"
        size="sm"
        color="gray"
        class="rotate-90"
        @click="toggleOpenHeader"
      >
        <NuxtIcon
          name="common/chevron-duo-left"
          class="text-xl text-[#393939]"
          aria-hidden="true"
        />
      </UButton>
    </div>
    <div v-show="isOpen" class="flex items-center justify-between gap-14">
      <div class="flex items-center justify-center gap-[10px]">
        <NuxtIcon
          name="common/globe"
          class="fill-green-500 text-base text-green-500"
          aria-hidden="true"
        />
        <span
          class="rounded-lg bg-[#F7F7F9] px-2 py-1.5 text-xs text-[#788896]"
        >
          {{ domain }}
        </span>
      </div>
      <div class="flex items-center justify-center gap-4">
        <UButton variant="ghost" @click="$emit('back')">
          <template #leading>
            <NuxtIcon
              name="common/arrow-left"
              aria-hidden="true"
              class="text-xl"
            />
          </template>
          Kembali ke Halaman
        </UButton>
        <UButton variant="ghost" color="primary" @click="$emit('draft')">
          Simpan Draft
        </UButton>
        <!-- TODO: update preview feature -->
        <UButton variant="outline" disabled @click="$emit('preview')">
          Pratinjau
          <template #trailing>
            <NuxtIcon name="common/eye" class="text-xl" aria-hidden="true" />
          </template>
        </UButton>
        <UButton @click="$emit('publish')">
          <template #leading>
            <NuxtIcon name="common/plane" class="text-xl" aria-hidden="true" />
          </template>
          Terbitkan
        </UButton>
        <UButton
          variant="ghost"
          color="gray"
          class="-rotate-90"
          size="sm"
          @click="toggleOpenHeader"
        >
          <NuxtIcon
            name="common/chevron-duo-left"
            class="text-xl text-[#393939]"
            aria-hidden="true"
          />
        </UButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  const pageStore = usePageStore()

  const domain = computed(() => {
    return pageStore.builderConfig.domain
  })

  const isOpen = ref(true)

  function toggleOpenHeader() {
    isOpen.value = !isOpen.value
  }

  defineEmits(['back', 'draft', 'preview', 'publish'])
</script>

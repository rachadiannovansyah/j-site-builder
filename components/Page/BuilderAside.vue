<template>
  <aside
    :class="{
      'mt-3 flex h-fit w-[280px] flex-col items-start justify-between gap-[14px] rounded-lg bg-white px-[14px] py-4 shadow transition-all duration-150 ease-in-out': true,
      '!h-16 !w-16': !isOpen,
    }"
  >
    <div class="flex h-full w-full justify-between">
      <div
        :class="{
          'flex w-full flex-row items-center gap-3': true,
          'justify-center !gap-0': !isOpen,
        }"
      >
        <UButton
          variant="outline"
          color="gray"
          size="sm"
          :square="true"
          :ui="{ variant: { outline: 'ring-gray-300' } }"
          data-cy="page-builder-aside__button-toggle"
          @click="toggleOpenSide"
        >
          <NuxtIcon
            name="common/chevron-duo-left"
            :class="{ 'text-2xl text-[#393939]': true, 'rotate-180': isOpen }"
            aria-hidden="true"
          />
        </UButton>
        <h1
          v-show="isOpen"
          class="font-roboto text-base font-medium text-green-700"
          data-cy="page-builder-aside__header"
        >
          Atribut
        </h1>
      </div>
    </div>
    <div v-show="isOpen" class="flex w-full flex-col gap-[14px]">
      <div class="flex w-full flex-col gap-1">
        <BaseInput
          :model-value="title"
          label="Judul Page"
          data-cy="page-builder-aside__title"
          @update:model-value="pageStore.setPageTitle($event)"
        />
      </div>
      <div v-if="lastUpdatePage" class="flex w-full flex-col gap-1">
        <p
          :class="{
            'mb-1 font-lato text-[0.9375rem] leading-6 text-gray-800': true,
          }"
        >
          Update Terakhir
        </p>
        <div class="flex items-center gap-2 px-2">
          <p
            class="font-lato text-sm text-gray-600"
            data-cy="page-builder-aside__last-update"
          >
            {{ lastUpdatePage }}
          </p>
          <div
            :class="{
              'flex h-[17px] min-w-14 items-center justify-center gap-1 rounded-[27px]  p-1.5 text-white': true,
              'bg-green-800': statusPage === 'DRAFT',
              'bg-blue-700': statusPage === 'PUBLISHED',
            }"
          >
            <NuxtIcon
              v-if="statusPage === 'PUBLISHED'"
              name="common/plane"
              class="text-[10px]"
              aria-hidden="true"
            />
            <NuxtIcon
              v-else
              name="navigation/posting-menu-icon"
              class="text-[10px]"
              aria-hidden="true"
            />
            <p class="w-full font-lato text-[10px] font-medium capitalize">
              {{ statusPage === 'PUBLISHED' ? 'Terbit' : 'Draft' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const pageStore = usePageStore()

  const title = computed(() => {
    return pageStore.builderConfig.title?.toString()
  })

  const lastUpdatePage = computed(() => {
    return pageStore.builderConfig.lastUpdate?.toString()
  })

  const statusPage = computed(() => {
    return pageStore.builderConfig.status?.toString()
  })

  const isOpen = ref(true)

  const toggleOpenSide = () => {
    isOpen.value = !isOpen.value
  }
</script>

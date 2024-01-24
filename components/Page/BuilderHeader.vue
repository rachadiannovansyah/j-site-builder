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
        data-cy="page-builder-header__logo-image"
      />
      <h1
        v-show="isOpen"
        class="font-lato text-xl font-bold text-gray-900"
        data-cy="page-builder-header__logo-name"
      >
        J-Site
      </h1>
      <UButton
        v-show="!isOpen"
        variant="ghost"
        size="sm"
        color="gray"
        class="rotate-90"
        data-cy="page-builder-header__button-toggle-header"
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
        <!-- Loading Skeleton -->
        <span
          v-if="props.loading"
          class="h-[26px] w-[150px] animate-pulse rounded-lg bg-gray-200"
        />
        <span
          v-else
          class="rounded-lg bg-[#F7F7F9] px-2 py-1.5 text-xs text-[#788896]"
          data-cy="page-builder-header__domain-site"
        >
          {{ domain }}
        </span>
      </div>
      <div class="flex items-center justify-center gap-4">
        <UButton
          variant="ghost"
          data-cy="page-builder-header__button-back"
          @click="$emit('back')"
        >
          <template #leading>
            <NuxtIcon
              name="common/arrow-left"
              aria-hidden="true"
              class="text-xl"
            />
          </template>
          Kembali ke Halaman
        </UButton>
        <UButton
          v-if="statusPage !== 'PUBLISHED'"
          variant="ghost"
          color="primary"
          data-cy="page-builder-header__button-save-draft"
          @click="$emit('draft')"
        >
          Simpan Draft
        </UButton>
        <UButton
          variant="outline"
          data-cy="page-builder-header__button-preview"
          @click="$emit('preview')"
        >
          Pratinjau
          <template #trailing>
            <NuxtIcon name="common/eye" class="text-xl" aria-hidden="true" />
          </template>
        </UButton>
        <UButton
          v-if="statusPage !== 'PUBLISHED'"
          data-cy="page-builder-header__button-save-publish"
          @click="$emit('publish')"
        >
          <template #leading>
            <NuxtIcon name="common/plane" class="text-xl" aria-hidden="true" />
          </template>
          Terbitkan
        </UButton>
        <UButton
          v-if="statusPage === 'PUBLISHED'"
          color="primary"
          data-cy="page-builder-header__button-save-draft"
          @click="$emit('publish')"
        >
          <template #leading>
            <NuxtIcon
              name="navigation/posting-menu-icon"
              class="text-xl"
              aria-hidden="true"
            />
          </template>
          Perbaharui
        </UButton>
        <UButton
          variant="ghost"
          color="gray"
          class="-rotate-90"
          size="sm"
          data-cy="page-builder-header__button-toggle-header"
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
  const props = defineProps({
    loading: {
      type: Boolean,
      default: true,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  })

  const pageStore = usePageStore()

  const domain = computed(() => {
    return pageStore.builderConfig.domain
  })

  const statusPage = computed(() => {
    return pageStore.builderConfig.status?.toString()
  })

  const isOpen = ref(true)

  function toggleOpenHeader() {
    isOpen.value = !isOpen.value
  }

  defineEmits(['back', 'draft', 'preview', 'publish'])
</script>

<template>
  <section
    class="bg-pattern-content flex h-full w-full flex-col gap-4 rounded-lg bg-white bg-right-top bg-no-repeat px-3.5 py-7"
  >
    <div class="mb-8 flex items-start justify-between sm:flex-wrap">
      <div class="flex gap-8">
        <SearchBar placeholder="Cari Halaman" @input="onSearch($event)" />
        <FilterBar />
      </div>
      <BaseButton
        v-if="!state.isEmptyData"
        variant="primary"
        class="flex gap-2"
      >
        <NuxtIcon
          name="common/plus"
          class="text-lg text-white"
          aria-hidden="true"
        />
        <p>Buat Halaman Baru</p>
      </BaseButton>
    </div>
    <div class="flex h-full w-full flex-col items-center justify-center">
      <NoData
        title="Kamu belum memiliki halaman !"
        description="Tenang saja, kita siap membantu kamu memulainya dengan informasi konten
      halaman yang menakjubkan!"
      >
        <BaseButton
          v-if="state.isEmptyData"
          variant="primary"
          class="flex gap-2"
        >
          <NuxtIcon
            name="common/plus"
            class="text-lg text-white"
            aria-hidden="true"
          />
          <p>Membuat Halaman</p>
        </BaseButton>
      </NoData>
    </div>
  </section>
</template>

<script setup>
  definePageMeta({
    title: 'Halaman',
  })

  // TODO: change state isEmptyData into data fetch
  const state = reactive({
    isEmptyData: true,
  })
</script>

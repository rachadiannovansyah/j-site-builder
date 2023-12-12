<template>
  <section
    class="flex h-full w-full flex-col gap-4 rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
  >
    <div class="mb-8 flex items-start justify-between sm:flex-wrap">
      <div class="flex gap-8">
        <SearchBar placeholder="Cari Postingan" class="max-w-[181px]" />
        <FilterBar />
      </div>
    </div>
    <div class="flex h-full w-full flex-col items-center justify-center">
      <NoData
        title="Kamu belum memiliki Post !"
        description="Tenang saja, kita siap membantu kamu memulainya dengan informasi konten
      Post yang menakjubkan!"
      >
        <UButton data-cy="j-site-page__button-create-new-page">
          <template #leading>
            <NuxtIcon
              name="common/plus"
              class="text-lg text-white"
              aria-hidden="true"
            />
          </template>
          Membuat Post
        </UButton>
      </NoData>
    </div>
  </section>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Posting',
  })
</script>

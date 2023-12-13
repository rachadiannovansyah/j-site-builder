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
    <div
      v-if="data.length === 0"
      class="flex h-full w-full flex-col items-center justify-center"
    >
      <NoData
        title="Kamu belum memiliki Post !"
        description="Tenang saja, kita siap membantu kamu memulainya dengan informasi konten
      Post yang menakjubkan!"
      >
        <UButton data-cy="j-site-post__button-create-new-post">
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

    <div v-else class="flow-root">
      <ul role="list" class="flex flex-col gap-[10px]">
        <PostList :data="data" />
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Posting',
  })

  // TODO: replace dummy data with service API
  const data = [
    {
      title:
        'The Importance of Public Services in Improving Quality of Life Life Life Life Life Life',
      updated_at: '06/02/2023',
      category: {
        id: 1,
        name: 'Pendidikan',
      },
      status: 'PUBLISHED',
    },
    {
      title: 'The Future of Public Services: Challenges and Opportunities',
      updated_at: '06/02/2023',
      category: {
        id: 2,
        name: 'Ekonomi',
      },
      status: 'PUBLISHED',
    },
    {
      title: 'The Impact of Technology on Public Services Delivery',
      updated_at: '06/02/2023',
      category: {
        id: 3,
        name: 'Berita Umum',
      },
      status: 'DRAFT',
    },
    {
      title:
        'How Public-Private Partnerships are Revolutionizing Public Services',
      updated_at: '06/02/2023',
      category: {
        id: 2,
        name: 'Ekonomi',
      },
      status: 'DRAFT',
    },
    {
      title:
        'Maximizing Efficiency in Public Service Provision through Innovation',
      updated_at: '06/02/2023',
      category: {
        id: 3,
        name: 'Berita Umum',
      },
      status: 'ARCHIVED',
    },
  ]
</script>

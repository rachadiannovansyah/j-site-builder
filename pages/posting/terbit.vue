<template>
  <section
    class="flex h-fit w-full flex-col gap-4 rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
  >
    <div class="mb-8 flex items-start justify-between sm:flex-wrap">
      <div class="flex gap-8">
        <SearchBar placeholder="Cari Postingan" class="max-w-[181px]" />
        <FilterBar />
      </div>
      <UButton
        v-if="post.data.length !== 0"
        data-cy="j-site-post__button-create-new-post"
      >
        <template #leading>
          <NuxtIcon
            name="common/plus"
            class="text-lg text-white"
            aria-hidden="true"
          />
        </template>
        Membuat Post
      </UButton>
    </div>
    <section v-if="loadingData">
      <LoadingListSkeleton />
    </section>
    <section v-else>
      <div
        v-if="post.data.length === 0"
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
        <ul role="list" class="flex flex-col gap-3">
          <PostList :data="post.data" />
        </ul>
        <BasePagination
          class="mt-4"
          :limit="params.limit"
          :total-rows="post.meta?.total"
          :limit-options="['10', '15', '20']"
          :current-page="post.meta?.page"
          :total-page="post.meta?.last_page"
          @change-limit="setParamsLimit"
          @change-page="setParamsPage"
          @previous-page="onPreviousPage"
          @next-page="onNextPage"
        />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
  import { IPostData, IMetaData } from '~/repository/j-site/types/post'

  definePageMeta({
    title: 'Posting',
  })

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()

  const loadingData = ref(true)

  const post = reactive({
    data: [] as IPostData[],
    meta: null as null | IMetaData,
  })

  const params = reactive({
    page: 1 as string | number,
    limit: 10 as string | number,
    q: '' as string,
    status: 'PUBLISHED' as string,
  })

  async function fetchDataPost() {
    loadingData.value = true
    const { data } = await $jSiteApi.post.getPostList(
      siteStore.siteId ?? '',
      { query: params },
      { server: false },
    )

    post.data = toRaw(data.value?.data ?? [])
    post.meta = toRaw(data.value?.meta ?? null)
    loadingData.value = false
  }

  onMounted(() => {
    fetchDataPost()
  })

  function setParamsLimit(limit: string | number) {
    params.limit = limit
    params.page = 1
    fetchDataPost()
  }

  function setParamsPage(page: string | number) {
    params.page = page
    fetchDataPost()
  }

  function onPreviousPage() {
    params.page = Number(params.page) - 1
    fetchDataPost()
  }

  function onNextPage() {
    params.page = Number(params.page) + 1
    fetchDataPost()
  }
</script>

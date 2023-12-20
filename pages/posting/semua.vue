<template>
  <section
    class="flex h-fit w-full flex-col gap-4 rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
  >
    <div class="mb-8 flex items-start justify-between sm:flex-wrap">
      <div class="flex gap-8">
        <SearchBar
          placeholder="Cari Postingan"
          class="max-w-[181px]"
          @input="onSearch($event)"
        />
        <FilterBar v-bind="filterProps" />
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
    <section
      v-if="loadingData"
      class="flex h-full w-full flex-col rounded-lg bg-white bg-pattern-content bg-right-top bg-no-repeat px-3.5 py-7"
    >
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
          <PostList :data="post.data" @archive="onArchivePost($event)" />
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

  <!-- Status Change Confirmation -->
  <BaseModal
    :open="isOpenActionConfirmation"
    with-close-button
    button-position="right"
    :header="confirmation.title"
    @close="isOpenActionConfirmation = false"
  >
    <div class="flex items-start p-3">
      <p class="font-lato text-sm leading-6 text-gray-600">
        {{ confirmation.body }}
      </p>
    </div>
    <template #footer>
      <UButton
        variant="outline"
        color="gray"
        @click="isOpenActionConfirmation = false"
      >
        Tidak
      </UButton>
      <UButton
        v-if="confirmation.status === 'ARCHIVED'"
        @click="actionArchivePost()"
      >
        Ya, Arsipkan
      </UButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { IPostData, IMetaData } from '~/repository/j-site/types/post'

  definePageMeta({
    title: 'Posting',
  })

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()

  const loadingData = ref(true)
  // @TODO: Update static filterProps when input calendar component is ready
  const filterProps = {
    title: 'Filter Post',
    categoryTitle: 'Kategori Post',
    categories: [
      'Pendidikan',
      'Berita',
      'Kesehatan',
      'Pembangunan',
      'Properti',
      'Lingkungan',
      'Ketenagakerjaan',
    ],
    disabled: false,
  }

  const post = reactive({
    data: [] as IPostData[],
    meta: null as null | IMetaData,
  })

  const params = reactive({
    page: 1 as string | number,
    limit: 10 as string | number,
    q: '' as string,
    status: '' as string,
  })

  const isOpenActionConfirmation = ref(false)
  const confirmation = reactive({
    title: '',
    body: '',
    status: '', // status post action
    postId: '', // id post
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

  interface ISetConfirmation {
    title: string
    body: string
    status?: string
    postId?: string
  }

  function setConfirmation({ title, body, status, postId }: ISetConfirmation) {
    confirmation.title = title
    confirmation.body = body

    if (status) {
      confirmation.status = status
    }
    if (postId) {
      confirmation.postId = postId
    }
  }

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

  function onSearch(query: string) {
    params.q = query
    fetchDataPost()
  }

  async function onArchivePost(id: string) {
    isOpenActionConfirmation.value = true
    setConfirmation({
      title: 'Arsipkan Post',
      body: 'Apakah Anda ingin mengarsipkan Post ini ?',
      status: 'ARCHIVED',
      postId: id,
    })
  }

  async function actionArchivePost() {
    isOpenActionConfirmation.value = false
    await $jSiteApi.post.patchPostStatus(
      siteStore.siteId ?? '',
      confirmation.postId,
      { status: 'ARCHIVED' },
      { server: false },
    )
  }
</script>

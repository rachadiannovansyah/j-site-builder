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
          <PostList
            :data="post.data"
            @archive="onArchivePost($event)"
            @delete="onDeletePost($event)"
          />
        </ul>
        <BasePagination
          class="mt-4"
          :limit="params.limit"
          :total-rows="post.meta?.total"
          :limit-options="['5', '10', '15', '20']"
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

  <!-- Archive Post Confirmation -->
  <BaseModal
    :open="postActionStatus === POST_STATUS.ARCHIVE"
    with-close-button
    button-position="right"
    :header="confirmation.title"
    @close="closeConfirmationModal"
  >
    <div class="flex items-start p-3">
      <p class="font-lato text-sm leading-6 text-gray-600">
        {{ confirmation.body }}
      </p>
    </div>
    <template #footer>
      <UButton variant="outline" color="gray" @click="closeConfirmationModal">
        Tidak
      </UButton>
      <UButton @click="actionArchivePost()"> Ya, Arsipkan </UButton>
    </template>
  </BaseModal>

  <!-- Delete Post Confirmation -->
  <BaseModal
    :open="postActionStatus === POST_STATUS.DELETE"
    with-close-button
    button-position="right"
    @close="closeConfirmationModal"
  >
    <div class="flex items-start">
      <NuxtIcon
        name="common/trash-circle"
        class="mr-4 inline-block flex-shrink-0 text-5xl"
        aria-hidden="true"
        filled
      />
      <div>
        <h3 class="mb-2 font-roboto text-xl font-semibold text-gray-800">
          {{ confirmation.title }}
        </h3>
        <p class="font-lato text-sm leading-6 text-gray-600">
          {{ confirmation.body }}
        </p>
      </div>
    </div>
    <template #footer>
      <UButton variant="outline" color="gray" @click="closeConfirmationModal">
        Batalkan
      </UButton>
      <UButton @click="actionDeletePost()"> Ya, saya yakin </UButton>
    </template>
  </BaseModal>

  <!-- Progress -->
  <ProgressModal
    :open="postActionStatus === POST_STATUS.LOADING"
    :value="postLoadingProgress"
    :title="confirmation.title"
    :message="confirmation.body"
  />

  <!-- Error / Success Modal -->
  <BaseModal
    :open="
      postActionStatus === POST_STATUS.SUCCESS ||
      postActionStatus === POST_STATUS.ERROR
    "
    :header="modal.title"
    button-position="center"
    :with-close-button="true"
    :modal-ui="{
      width: 'sm:max-w-[533px]',
    }"
    @close="closeConfirmationModal"
  >
    <div class="flex items-center justify-center gap-2">
      <div class="flex h-full w-[18px] items-center justify-center">
        <NuxtIcon
          v-if="postActionStatus === POST_STATUS.SUCCESS"
          name="common/check-circle"
          class="text-base text-green-700"
          aria-hidden="true"
        />
        <NuxtIcon
          v-else
          name="common/warning-triangle"
          class="text-base text-red-600"
          aria-hidden="true"
        />
      </div>
      <div class="h-full w-full grow flex-col">
        <p class="font-lato text-sm leading-6 text-gray-600">
          {{ modal.message }}
        </p>
      </div>
    </div>
    <template #footer>
      <BaseButton variant="primary" @click="onPostActionDone">
        Saya Mengerti
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { IPostData, IMetaData } from '~/repository/j-site/types/post'

  definePageMeta({
    title: 'Posting',
  })

  const POST_STATUS = {
    NONE: 'NONE',
    ARCHIVE: 'ARCHIVE',
    DELETE: 'DELETE',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING',
  }

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

  const postActionStatus = ref(POST_STATUS.NONE)
  const postLoadingProgress = ref(0)

  const confirmation = reactive({
    title: '',
    body: '',
    status: '', // status post action
    postId: '', // id post
  })

  const modal = reactive({
    icon: '',
    title: '',
    message: '',
  })

  async function fetchDataPost() {
    loadingData.value = true
    const { data: responseData } = await $jSiteApi.post.getPostList(
      siteStore.siteId ?? '',
      { query: params },
      { server: false },
    )

    const postData = toRaw(responseData.value?.data ?? [])
    const metaData = toRaw(responseData.value?.meta ?? null)

    // handle numbering on each page
    if (postData.length > 0) {
      post.data = postData.map((item, index) => ({
        ...item,
        index: index + Number(metaData?.from),
      }))
    }

    post.meta = metaData
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

  function setLoadingProgress(value: number) {
    postLoadingProgress.value = value
  }

  function closeConfirmationModal() {
    postActionStatus.value = POST_STATUS.NONE
  }

  function onPostActionDone() {
    postActionStatus.value = POST_STATUS.NONE
    resetModal()
    resetConfirmation()
    fetchDataPost()
  }

  function resetModal() {
    modal.title = ''
    modal.message = ''
    modal.icon = ''
  }

  function resetConfirmation() {
    confirmation.title = ''
    confirmation.body = ''
    confirmation.postId = ''
    confirmation.status = ''
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
    postActionStatus.value = POST_STATUS.ARCHIVE
    setConfirmation({
      title: 'Arsipkan Post',
      body: 'Apakah Anda ingin mengarsipkan Post ini ?',
      status: 'ARCHIVED',
      postId: id,
    })
  }

  async function actionArchivePost() {
    postActionStatus.value = POST_STATUS.LOADING

    setConfirmation({
      title: 'Arsipkan Post',
      body: 'Mohon tunggu, proses mengarsipkan post sedang diproses.',
    })

    const { status } = await $jSiteApi.post.patchPostStatus(
      siteStore.siteId ?? '',
      confirmation.postId,
      { status: 'ARCHIVED' },
      { server: false },
    )

    if (status.value === 'success') {
      setLoadingProgress(25)
      setTimeout(() => {
        setLoadingProgress(100)
        setTimeout(() => {
          postActionStatus.value = POST_STATUS.SUCCESS
          modal.title = 'Berhasil!'
          modal.message = 'Post berhasil diarsipkan.'
        }, 250)
      }, 250)
    } else if (status.value === 'error') {
      postActionStatus.value = POST_STATUS.ERROR
      modal.title = 'Gagal!'
      modal.message = 'Post gagal diarsipkan.'
    }
  }

  async function onDeletePost(id: string) {
    postActionStatus.value = POST_STATUS.DELETE
    setConfirmation({
      title: 'Menghapus Post',
      body: 'Apakah Anda ingin menghapus Post ?',
      postId: id,
    })
  }

  async function actionDeletePost() {
    postActionStatus.value = POST_STATUS.LOADING

    setConfirmation({
      title: 'Menghapus Post',
      body: 'Mohon tunggu, Hapus post sedang diproses.',
    })

    const { status } = await $jSiteApi.post.deletePost(
      siteStore.siteId ?? '',
      confirmation.postId,
      { server: false },
    )

    if (status.value === 'success') {
      setLoadingProgress(25)
      setTimeout(() => {
        setLoadingProgress(100)
        setTimeout(() => {
          postActionStatus.value = POST_STATUS.SUCCESS
          modal.title = 'Berhasil!'
          modal.message = 'Post berhasil dihapus.'
        }, 250)
      }, 250)
    } else if (status.value === 'error') {
      postActionStatus.value = POST_STATUS.ERROR
      modal.title = 'Gagal!'
      modal.message = 'Post gagal dihapus.'
    }
  }
</script>

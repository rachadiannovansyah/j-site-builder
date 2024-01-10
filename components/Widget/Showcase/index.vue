<template>
  <!-- Parent Modal: List Showcase -->
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ width: 'md:max-w-[734px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:px-2 sm:pb-2 sm:pt-0',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="font-roboto text-xl font-medium leading-8 text-green-800"
            data-cy="j-site-widget-showcase__header"
          >
            Pengaturan Showcase
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            data-cy="j-site-widget-showcase__button-close"
            @click="$emit('close')"
          />
        </div>
        <div class="mt-4 flex justify-end">
          <UButton
            color="primary"
            variant="solid"
            label="Tambah"
            icon="i-heroicons-plus-20-solid"
            data-cy="j-site-widget-showcase__button-add"
            @click="addItemShowcase"
          />
        </div>
      </template>

      <template v-if="dataShowcase.length !== 0">
        <section
          class="showcase-list flex h-[385px] w-full flex-col items-center justify-center gap-x-3 gap-y-4 overflow-y-auto bg-[#F9F9F9] px-6 py-4 md:grid md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(item, index) in dataShowcase"
            :key="index"
            class="relative flex h-[213px] w-[216px] flex-col items-center justify-center gap-4"
          >
            <div
              class="flex h-[173px] w-[216px] items-center justify-center rounded-lg bg-white"
            >
              <NuxtImg
                :src="item?.file?.uri || ''"
                :alt="item?.title || ''"
                width="72"
                height="78"
                :data-cy="`j-site-widget-showcase__image-${index}`"
              />
            </div>
            <p
              class="line-clamp-1 h-[24px] font-roboto text-base font-medium text-gray-800"
              :data-cy="`j-site-widget-showcase__title-${index}`"
            >
              {{ item.title }}
            </p>
            <button
              class="absolute left-3 top-3"
              :data-cy="`j-site-widget-showcase__button-delete-${index}`"
              @click="showDeleteConfirmation(item, index)"
            >
              <NuxtIcon
                name="common/trash"
                aria-hidden="true"
                class="text-base text-red-700"
              />
            </button>
            <button
              class="absolute right-3 top-3"
              :data-cy="`j-site-widget-showcase__button-edit-${index}`"
              @click="editItemShowcase(item, index)"
            >
              <NuxtIcon
                name="common/pencil"
                aria-hidden="true"
                class="text-base text-green-700"
              />
            </button>
          </div>
        </section>
      </template>

      <template v-else>
        <section class="flex h-[385px] w-full items-center justify-center">
          <NoData
            class="col-span-4"
            title="Kamu belum memiliki showcase"
            description="Kamu dapat menambahkan showcase dengan cara Upload Gambar atau Pilih Logo
    melalui tombol Tambah diatas dengan rekomendasi ukuran gambar adalah resolusi 500 x 500 pixel (.jpg dan .png) 
    dan ukuran maksimal 2MB."
          />
        </section>
      </template>
    </UCard>

    <!-- Child Modal: Add/Edit Showcase -->
    <WidgetShowcaseAddEditForm
      :open="isOpenAddEditShowcase"
      :is-edit-mode="isEditShowcase"
      :data="itemShowcase"
      @close="isOpenAddEditShowcase = false"
      @push-data="pushDataShowcase"
      @edit-data="editDataShowcase"
    />

    <!-- Delete Confirmation -->
    <BaseModal
      :open="imageUploadStatus === 'DELETING'"
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
        <UButton @click="removeItemShowcase()"> Ya, saya yakin </UButton>
      </template>
    </BaseModal>

    <!-- Upload/Delete Status -->
    <BaseModal
      :open="imageUploadStatus === 'SUCCESS' || imageUploadStatus === 'ERROR'"
      :header="confirmation.title"
    >
      <p class="flex items-center font-lato text-sm leading-6 text-gray-800">
        {{ confirmation.body }}
      </p>
      <template #footer>
        <UButton @click="closeConfirmationModal">Saya Mengerti</UButton>
      </template>
    </BaseModal>
  </UModal>
</template>

<script setup lang="ts">
  import { ILogosData } from '~/repository/j-site/types/logo'
  const MEDIA_UPLOAD_STATUS = {
    NONE: 'NONE',
    DELETING: 'DELETING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  }
  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    sectionIndex: {
      type: Number,
      default: null,
    },
    widgetIndex: {
      type: Number,
      default: null,
    },
  })

  const { $jSiteApi } = useNuxtApp()
  const pageStore = usePageStore()

  const isEditShowcase = ref(false)
  const isOpenAddEditShowcase = ref(false)
  const dataShowcase = reactive<ILogosData[]>([])
  const itemShowcase = ref({})
  const indexItemActive = ref(0 as number)
  const imageUploadStatus = ref(MEDIA_UPLOAD_STATUS.NONE)
  const confirmation = reactive({
    title: '',
    body: '',
    media: '',
    itemId: '', // for delete purposes
  })

  const emit = defineEmits(['close', 'set-active-content'])

  function pushDataShowcase({ file, title, description, link }: ILogosData) {
    dataShowcase.push({
      file: {
        uri: file.uri,
        id: file.id,
        source: file.source,
      },
      title: title,
      description: description,
      link: link,
    })
  }

  function editDataShowcase({ file, title, description, link }: ILogosData) {
    dataShowcase[indexItemActive.value].file.id = file.id || ''
    dataShowcase[indexItemActive.value].file.uri = file.uri || ''
    dataShowcase[indexItemActive.value].file.source = file.source || ''
    dataShowcase[indexItemActive.value].title = title || ''
    dataShowcase[indexItemActive.value].description = description || ''
    dataShowcase[indexItemActive.value].link = link || ''
  }

  function addItemShowcase() {
    isEditShowcase.value = false
    isOpenAddEditShowcase.value = true
  }

  async function deleteUploadedShowcase(id: string) {
    await $jSiteApi.media.deleteMedia(id, undefined, {
      server: false,
    })
  }

  function removeSelectedShowcase() {
    dataShowcase.splice(indexItemActive.value, 1)
  }

  function removeItemShowcase() {
    removeSelectedShowcase()
    if (confirmation.media === 'media') {
      deleteUploadedShowcase(confirmation.itemId || '')
    }
    closeConfirmationModal()
  }

  function editItemShowcase(item: ILogosData, index: number) {
    isEditShowcase.value = true
    itemShowcase.value = item
    isOpenAddEditShowcase.value = true
    indexItemActive.value = index
  }

  /**
   * Mutate `page` store evey time `uploadedImages` changes
   */
  watch(
    dataShowcase,
    async () => {
      await nextTick()
      pageStore.setWidgetPayload({
        sectionIndex: props.sectionIndex,
        widgetIndex: props.widgetIndex,
        payload: {
          items: toRaw(dataShowcase),
        },
      })
    },
    { immediate: true },
  )

  watch(dataShowcase, (value) => {
    emit('set-active-content', value.length)
  })

  /**
   * Reset confirmation data and upload progress
   * when confirmation modal is closed
   */
  watch(imageUploadStatus, (newValue) => {
    if (newValue === MEDIA_UPLOAD_STATUS.NONE) {
      // wait modal to closed all the way before reset confirmation
      setTimeout(() => {
        resetConfirmation()
      }, 300)
    }
  })

  interface ISetConfirmation {
    title: string
    body: string
    media?: string
    itemId?: string
  }

  function setConfirmation({ title, body, media, itemId }: ISetConfirmation) {
    confirmation.title = title
    confirmation.body = body

    if (itemId) {
      confirmation.itemId = itemId
    }

    if (media) {
      confirmation.media = media
    }
  }

  function resetConfirmation() {
    confirmation.title = ''
    confirmation.body = ''
    confirmation.media = ''
    confirmation.itemId = ''
  }

  function setModalStatus(value: string) {
    imageUploadStatus.value = value
  }

  function closeConfirmationModal() {
    imageUploadStatus.value = MEDIA_UPLOAD_STATUS.NONE
  }

  function showDeleteConfirmation(item: ILogosData, index: number) {
    indexItemActive.value = index
    setModalStatus(MEDIA_UPLOAD_STATUS.DELETING)
    setConfirmation({
      title: 'Menghapus Gambar',
      body: 'Apakah anda yakin ingin menghapus gambar dari daftar Showcase?',
      media: item.file.source,
      itemId: item.file.id,
    })
  }
</script>

<style scoped>
  /* Scroll bar stylings */
  .showcase-list {
    scrollbar-color: #bdbdbd none;
    scrollbar-width: thin;
  }
  .showcase-list::-webkit-scrollbar {
    width: 4px;
  }

  .showcase-list::-webkit-scrollbar-track {
    background-color: none;
  }

  .showcase-list::-webkit-scrollbar-thumb {
    background-color: #bdbdbd;
    outline: none;
    border-radius: 6px;
    background-clip: padding-box;
  }
  /* End of scroll bar stylings */
</style>

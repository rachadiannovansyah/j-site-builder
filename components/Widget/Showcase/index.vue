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
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Pengaturan Showcase
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="$emit('close')"
          />
        </div>
        <div class="mt-4 flex justify-end">
          <UButton
            color="primary"
            variant="solid"
            label="Tambah"
            icon="i-heroicons-plus-20-solid"
            @click="addItemShowcase"
          />
        </div>
      </template>

      <template v-if="dataShowcase.length !== 0">
        <section
          class="flex h-[385px] w-full flex-col items-center justify-center gap-x-3 gap-y-4 overflow-y-auto bg-[#F9F9F9] px-6 py-4 md:grid md:grid-cols-2 lg:grid-cols-3"
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
              />
            </div>
            <p
              class="line-clamp-1 h-[24px] font-roboto text-base font-medium text-gray-800"
            >
              {{ item.title }}
            </p>
            <button
              class="absolute left-3 top-3"
              @click="removeItemShowcase(item, index)"
            >
              <NuxtIcon
                name="common/trash"
                aria-hidden="true"
                class="text-base text-red-700"
              />
            </button>
            <button
              class="absolute right-3 top-3"
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
  </UModal>
</template>

<script setup lang="ts">
  import { ILogosData } from '~/repository/j-site/types/logo'

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

  const emit = defineEmits(['close', 'set-active-content'])

  function pushDataShowcase({
    file,
    title,
    description,
    link,
    source,
  }: ILogosData) {
    dataShowcase.push({
      file: {
        uri: file.uri,
        id: file.id,
      },
      title: title,
      description: description,
      link: link,
      source: source,
    })
  }

  function editDataShowcase({
    file,
    title,
    description,
    link,
    source,
  }: ILogosData) {
    dataShowcase[indexItemActive.value].file.uri = file.uri || ''
    dataShowcase[indexItemActive.value].file.id = file.id || ''
    dataShowcase[indexItemActive.value].title = title || ''
    dataShowcase[indexItemActive.value].description = description || ''
    dataShowcase[indexItemActive.value].link = link || ''
    dataShowcase[indexItemActive.value].source = source || ''
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

  function removeItemShowcase(item: ILogosData, index: number) {
    indexItemActive.value = index
    removeSelectedShowcase()
    if (item.source === 'media') {
      deleteUploadedShowcase(item.file.id || '')
    }
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
</script>

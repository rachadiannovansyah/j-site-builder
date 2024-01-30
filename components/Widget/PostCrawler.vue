<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[920px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-2 sm:px-6',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
          padding: 'sm:py-3 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Setup Tampilan Post
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section class="grid grid-cols-1 gap-y-6">
        <div class="flex flex-col gap-3 px-12">
          <p class="font-base font-lato font-medium text-gray-800">
            Pilih Kombinasi
          </p>
          <div class="flex justify-between">
            <div class="flex gap-4">
              <div
                v-for="(type, index) in postType"
                :key="index"
                class="flex h-[54px] w-[200px] items-center justify-between rounded-[27px] border border-gray-300 bg-white py-1.5 pl-3 pr-4 focus:outline-none"
              >
                <label
                  class="text-left font-lato text-sm font-medium text-gray-900"
                >
                  {{ type.label }}
                </label>
                <UCheckbox
                  :value="type.value"
                  :model-value="type.selected"
                  :checked="type.selected"
                  name="Terpopuler"
                  @change="onCheckedPostType(type.value)"
                />
              </div>
            </div>
            <div
              class="flex h-[54px] w-[125px] items-center justify-between rounded-[27px] border border-gray-300 bg-white py-1.5 pl-3 pr-4 focus:outline-none"
            >
              <NuxtIcon
                name="common/pin"
                aria-hidden="true"
                class="text-[18px] text-black"
              />
              <label
                class="text-left font-lato text-sm font-medium text-gray-900"
              >
                Pinned
              </label>
              <UCheckbox
                name="Pinned Post"
                :value="form.isPinnedPost"
                :model-value="form.isPinnedPost"
                :checked="form.isPinnedPost"
                @change="onCheckPinnedPost()"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3 px-12">
          <p class="font-base font-lato font-medium text-gray-800">
            Pilih Format Tampilan
          </p>
          <RadioGroup
            v-model="form.selectedPostFormat"
            class="flex justify-center gap-4"
          >
            <RadioGroupOption
              v-for="(format, index) in POST_FORMAT_DISPLAY"
              :key="index"
              v-slot="{ checked }"
              :value="format.value"
              class="flex flex-col items-center justify-center gap-3"
            >
              <div
                :class="{
                  'flex h-[124px] w-[210px] rounded-[14px] border border-gray-300 bg-white p-3 focus:outline-none': true,
                  'cursor-pointer ring-2 ring-green-700': checked,
                }"
              >
                <img
                  :src="format.icon"
                  width="186"
                  height="100"
                  class="h-[100px] w-[186px] object-cover object-center"
                  :alt="`Ilustrasi ${format.label}`"
                />
              </div>
              <RadioGroupLabel
                :class="{
                  'text-left font-lato text-base font-bold text-gray-700': true,
                  'text-green-700': checked,
                }"
              >
                {{ format.label }}
              </RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
        </div>

        <div
          :class="{
            'flex max-h-[311px] w-full min-w-0 items-center justify-center rounded-[14px] border border-gray-400 bg-[#F9F9F9] p-2.5 px-6': true,
            'bg-white': form.selectedPostFormat,
          }"
        >
          <template v-if="form.selectedPostFormat">
            <div
              class="widget-post-crawler__preview flex max-h-[294px] w-full overflow-y-auto pt-4"
            >
              <img
                :src="selectedPostPreview"
                width="220"
                height="220"
                class="h-full w-full"
                alt="Ilustrasi tidak ada format post terpilih"
              />
            </div>
          </template>

          <template v-else>
            <div
              class="flex w-full flex-col items-center justify-center gap-[10px]"
            >
              <img
                src="/images/post/no-format-display-selected.svg"
                width="220"
                height="220"
                class="object-cover object-center"
                alt="Ilustrasi tidak ada format post terpilih"
              />
              <h1 class="font-roboto text-[21px] font-medium text-gray-900">
                Pilih Format Tampilan terlebih dahulu
              </h1>
              <p class="font-lato text-sm font-normal text-[#616161]">
                Untuk preview tampilan silakan pilih format tampilan terlebih
                dahulu
              </p>
            </div>
          </template>
        </div>
      </section>

      <template #footer>
        <section class="flex justify-between">
          <UButton variant="ghost" color="gray" @click="$emit('close')">
            Batal
          </UButton>
          <UButton @click="onSave"> Simpan </UButton>
        </section>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from '@headlessui/vue'

  const POST_FORMAT_DISPLAY = [
    {
      label: 'Thumbnail View',
      value: 'thumbnail',
      icon: '/images/post/thumbnail-view.svg',
      preview: '/images/post/thumbnail-preview.svg',
    },
    {
      label: 'List View',
      value: 'list',
      icon: '/images/post/list-view.svg',
      preview: '/images/post/list-preview.svg',
    },
    {
      label: 'Bar View',
      value: 'bar',
      icon: '/images/post/bar-view.svg',
      preview: '/images/post/bar-preview.svg',
    },
  ]

  const form = reactive({
    selectedPostType: [] as string[],
    selectedPostFormat: '',
    isPinnedPost: false as boolean,
  })
  const selectedPostPreview = ref('')

  const postType = reactive([
    {
      label: 'Terpopuler',
      value: 'views',
      selected: false as boolean,
    },
    {
      label: 'Terupdate',
      value: 'published_at',
      selected: false as boolean,
    },
  ])

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

  const pageStore = usePageStore()

  const emit = defineEmits(['close'])

  watch(
    () => form.selectedPostFormat,
    (value) => {
      if (value) {
        const findPost = POST_FORMAT_DISPLAY.find(
          ({ value }) => value === form.selectedPostFormat,
        )
        setPostPreview(findPost?.preview || '')
      }
    },
    { immediate: true },
  )

  function setPostPreview(value: string) {
    selectedPostPreview.value = value
  }

  function onCheckedPostType(type: string) {
    if (type === 'views') {
      postType[0].selected = !postType[0].selected
    } else {
      postType[1].selected = !postType[1].selected
    }

    const find = form.selectedPostType.findIndex((element) => element === type)
    if (find < 0) {
      form.selectedPostType.push(String(type))
    } else {
      form.selectedPostType.splice(find, 1)
    }
  }

  function onCheckPinnedPost() {
    form.isPinnedPost = !form.isPinnedPost
  }

  function setWidgetPayload() {
    pageStore.setWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
      payload: {
        sorts: form.selectedPostType,
        display: form.selectedPostFormat,
        sort_with_pinned: form.isPinnedPost,
      },
    })
  }

  function onSave() {
    setWidgetPayload()
    emit('close')
  }

  const currentStorePayload = computed(() => {
    return pageStore.getWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
    })
  })

  /**
   * Sync local state `form` with `pageStore` payload.
   * This is to avoid unmatch data between local state and pageStore state.
   */
  function syncFormData() {
    form.selectedPostType = currentStorePayload.value?.sorts ?? []
    form.selectedPostFormat = currentStorePayload.value?.display ?? ''
    form.isPinnedPost = currentStorePayload.value?.sort_with_pinned ?? false

    if (form.selectedPostType.length > 0) {
      form.selectedPostType.map((type) => {
        if (type === 'views') {
          postType[0].selected = true
        } else {
          postType[1].selected = true
        }
      })
    }
  }

  const isOpen = computed(() => {
    return props.open
  })

  const isEditPage = computed(() => {
    return pageStore.isEdit
  })

  watch(isOpen, function (open) {
    if (!open || isEditPage) {
      // wait for modal transition to finish
      setTimeout(() => {
        syncFormData()
      }, 300)
    }
  })

  onMounted(() => {
    if (!currentStorePayload.value) {
      setWidgetPayload()
    }
  })
</script>

<style scoped>
  .widget-post-crawler__preview::-webkit-scrollbar {
    width: 4px;
  }

  .widget-post-crawler__preview::-webkit-scrollbar-track {
    background-color: none;
  }

  .widget-post-crawler__preview::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: none;
    border-radius: 6px;
    background-clip: padding-box;
  }
</style>

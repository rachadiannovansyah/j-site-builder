<template>
  <UForm
    ref="postForm"
    :schema="schema"
    :state="form"
    :validate-on="['submit']"
    @submit.prevent="emit('submit-form')"
    @keyup.enter="$event.preventDefault()"
  >
    <slot name="header"></slot>

    <!-- Form Body -->
    <section class="grid grid-cols-[1fr,364px] gap-2.5">
      <div class="grid grid-cols-1 gap-y-2.5">
        <PostFormTitle />
        <PostFormImage />
        <PostFormContent />
      </div>

      <div class="rounded-lg bg-white p-[14px]">
        <p
          class="mb-[14px] font-roboto text-base font-medium leading-6 text-green-700"
        >
          Nama, Kategori dan Tag
        </p>
        <PostFormAuthor />
        <PostFormCategory />

        <!-- Tags Input Field -->
        <div class="mb-2.5 mt-5">
          <UFormGroup label="Tag" hint="(Opsional)" :error="tagErrorMessage">
            <UInput
              ref="tagInput"
              v-model.trim="newTagForm.tag"
              :loading="isTagLoading"
              autocomplete="off"
              autofill="off"
              name="tag"
              placeholder="Masukkan Tag"
              @keydown.enter.prevent="handleAddTag"
            />
          </UFormGroup>

          <!-- Tag Suggestions -->
          <UPopover
            :open="!!newTagForm.tag && tagSuggestions.length > 0"
            :popper="{
              offsetDistance: -8,
              adaptive: true,
              scroll: true,
            }"
            :ui="{
              wrapper: 'h-0',
            }"
          >
            <div />
            <template #panel>
              <ul class="max-h-[150px] w-[336px] overflow-y-auto p-2">
                <li v-for="suggestion in tagSuggestions" :key="suggestion">
                  <button
                    class="w-full rounded-sm px-2 text-start font-lato text-sm leading-6 text-gray-800 hover:bg-gray-100"
                    @click="selectTagSuggestion(suggestion)"
                  >
                    {{ suggestion }}
                  </button>
                </li>
              </ul>
            </template>
          </UPopover>
        </div>

        <ul
          class="flex min-h-[34px] w-full flex-wrap gap-1 rounded-lg border p-2"
        >
          <li
            v-for="tag in tags"
            :key="tag"
            class="flex min-h-5 items-center justify-center rounded-full bg-gray-200 py-1 pl-2.5 pr-1"
          >
            <span class="font-lato text-sm leading-none text-gray-600">
              {{ tag }}
            </span>
            <button
              class="relative top-[1px] ml-2"
              @click="handleDeleteTag(tag)"
            >
              <NuxtIcon
                name="common/close"
                aria-hidden="true"
                class="text-xl text-gray-600"
              />
            </button>
          </li>
        </ul>
      </div>
    </section>
  </UForm>
</template>

<script setup lang="ts">
  import { usePostStore } from '~/stores/post'
  import { z } from 'zod'
  import debounce from 'lodash.debounce'
  import { ITagRequestBody } from '~/repository/j-site/types/tag'

  const siteStore = useSiteStore()
  const postStore = usePostStore()
  const { $jSiteApi } = useNuxtApp()

  const emit = defineEmits(['submit-form'])

  /* ------------------------- Post Store Data Binding ------------------------ */

  const tags = computed(() => {
    return postStore.form.tags
  })

  /* ------------------------- Image Handler, Upload and Delete ------------------------ */

  /* ---------------------------- Category --------------------------- */

  /* ---------------------------------- Tags ---------------------------------- */
  const isTagLoading = ref(false)

  const newTagForm = reactive({
    tag: '',
  })

  const tagInput = ref()

  const tagErrorMessage = ref<string>()

  const tagSuggestions = ref<string[]>([])

  async function handleAddTag() {
    if (newTagForm.tag === '') return

    try {
      await validateTag(newTagForm.tag)

      const formattedTag = newTagForm.tag.replaceAll(' ', '').toLowerCase()

      isTagLoading.value = true

      const body: ITagRequestBody = {
        name: formattedTag,
      }

      const { status, error } = await $jSiteApi.tag.createTag(
        siteStore.siteId ?? '',
        body,
        { server: false },
      )

      if (status.value === 'success') {
        tagErrorMessage.value = ''

        if (!tags.value?.includes(formattedTag)) {
          postStore.pushTag(formattedTag)
        }
      }

      if (status.value === 'error') {
        console.error(error)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        tagErrorMessage.value = error.issues[0].message
      }
    } finally {
      resetTagForm()
      await nextTick()
      focusTagInput()
    }
  }

  function validateTag(tag: string) {
    const schema = z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]*$/, 'Tag tidak boleh mengandung simbol')

    return schema.parse(tag)
  }

  function resetTagForm() {
    newTagForm.tag = ''
    isTagLoading.value = false
    tagSuggestions.value = []
  }

  function focusTagInput() {
    const element = document.querySelector(
      `input[name="tag"]`,
    ) as HTMLInputElement

    element && element.focus()
  }

  function handleDeleteTag(tag: string) {
    postStore.removeTag(tag)
  }

  const getSuggestions = debounce(async (tag: string) => {
    const { data, status, error } = await $jSiteApi.tag.getTags(
      siteStore.siteId ?? '',
      { params: { q: tag } },
      { server: false },
    )

    if (status.value === 'success') {
      tagSuggestions.value = data.value?.data.map((item) => item.name) ?? []
    }

    if (status.value === 'error') {
      console.error(error)
      tagSuggestions.value = []
    }
  }, 500)

  function selectTagSuggestion(tag: string) {
    if (!tags.value?.includes(tag)) {
      postStore.pushTag(tag)
    }

    resetTagForm()
  }

  watch(
    () => newTagForm.tag,
    (value) => {
      if (value !== '') {
        const formattedTag = newTagForm.tag.replaceAll(' ', '').toLowerCase()
        getSuggestions(formattedTag)
      } else {
        tagSuggestions.value = []
      }
    },
  )

  /* ----------------------------- Form Validation ---------------------------- */

  const form = computed(() => {
    return postStore.form
  })

  const schema = z.object({
    title: z
      .string({ required_error: 'Judul berita tidak boleh kosong ' })
      .trim()
      .min(3, 'Judul berita harus lebih dari 3 karakter'),
    image: z
      .object({
        id: z.string(),
        uri: z.string(),
        filename: z.string(),
      })
      .refine(
        (data) => {
          return data.uri !== ''
        },
        { message: 'Gambar tidak boleh kosong' },
      ),
    content: z.string().trim().min(1, 'Konten tidak boleh kosong'),
    author: z
      .string()
      .trim()
      .min(3, 'Nama penulis harus lebih dari 3 karakter'),
    category: z.string().trim().min(1, 'Kategori tidak boleh kosong'),
  })
</script>

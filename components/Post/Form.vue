<template>
  <section class="grid grid-cols-[1fr,364px] gap-2.5">
    <div class="grid grid-cols-1 gap-y-2.5">
      <div class="rounded-lg bg-white p-[14px]">
        <p
          class="mb-[14px] font-roboto text-base font-medium leading-6 text-green-700"
        >
          Judul
        </p>
        <UFormGroup>
          <UTextarea
            v-model="title"
            :rows="2"
            placeholder="Masukkan judul berita"
            maxlength="255"
          />
          <template #help>
            <span class="font-lato text-xs text-gray-600">
              Tersisa {{ 255 - title.length }} Karakter
            </span>
          </template>
        </UFormGroup>
      </div>

      <div class="rounded-lg bg-white p-[14px]">
        <p class="font-roboto text-base font-medium leading-6 text-green-700">
          Gambar Utama
        </p>
        <p class="mb-[14px] font-lato text-sm text-gray-800">
          Ukuran maksimal file adalah 1 MB dengan resolusi 1080 x 720 . File
          yang didukung adalah .jpg dan .png
        </p>

        <!-- Image Dropzone -->
        <UFormGroup :error="dropzoneErrorMessages.length > 0">
          <BaseDropzone
            accept="image/jpeg, image/jpg, image/png, image/webp"
            :disabled="!!image.id || isDropzoneUploading"
            @change="handleImageChange"
            @clear="handleDeleteImage"
          >
            <template
              v-if="!!image.id && !isDropzoneUploading"
              #preview="{ clear }"
            >
              <div
                class="mt-4 flex h-10 w-full max-w-[400px] items-center justify-between rounded-lg border border-gray-400 px-4"
              >
                <span
                  class="truncate pr-4 font-lato text-sm leading-6 text-gray-800"
                >
                  {{ image?.filename }}
                </span>
                <div class="flex flex-shrink-0">
                  <UButton
                    title="Pratinjau gambar"
                    variant="ghost"
                    square
                    size="sm"
                    @click="togglePreviewImage"
                  >
                    <NuxtIcon name="common/eye" class="text-2xl" />
                  </UButton>
                  <UButton
                    title="Hapus gambar"
                    variant="ghost"
                    square
                    size="sm"
                    class="ml-2"
                    @click="clear"
                  >
                    <NuxtIcon name="common/close" class="text-2xl" />
                  </UButton>
                </div>
              </div>
            </template>
          </BaseDropzone>

          <template #error>
            <p
              v-for="error in dropzoneErrorMessages"
              :key="error"
              class="font-lato text-xs leading-6 text-red-500"
            >
              {{ error }}
            </p>
          </template>

          <p
            v-show="
              !image.id &&
              !isDropzoneUploading &&
              dropzoneErrorMessages.length === 0
            "
            class="mt-4 font-lato text-sm leading-6 text-gray-800"
          >
            Belum ada file terpilih
          </p>

          <p
            v-show="isDropzoneUploading && !image.id"
            class="mt-4 font-lato text-sm leading-6 text-gray-800"
          >
            Mengupload gambar...
          </p>
        </UFormGroup>
      </div>

      <div class="rounded-lg bg-white p-[14px]">
        <Editor v-model="content" v-bind="tinyMCEConfig" />
      </div>
    </div>

    <div class="rounded-lg bg-white p-[14px]">
      <p
        class="mb-[14px] font-roboto text-base font-medium leading-6 text-green-700"
      >
        Nama, Kategori dan Tag
      </p>

      <!-- Author Input Field -->
      <UFormGroup label="Nama Penulis" class="mb-[14px]">
        <UInput
          v-model="author"
          placeholder="Masukkan Nama Penulis"
          maxlength="150"
        />
      </UFormGroup>

      <!-- Category Radio Button -->
      <UFormGroup label="Kategori" class="py-5">
        <RadioGroup v-model="category">
          <RadioGroupOption
            v-for="(option, index) in categories"
            :key="option.value"
            v-slot="{ checked }"
            :value="option.value"
          >
            <li
              class="group grid w-full cursor-pointer list-none grid-cols-[20px,1fr,auto] items-center gap-3 bg-white p-2 hover:bg-gray-50"
            >
              <!-- Radio Button -->
              <div
                :class="{
                  'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-500': true,
                  'border-green-700': checked,
                }"
              >
                <div
                  v-show="checked"
                  class="h-2.5 w-2.5 rounded-full bg-green-700"
                />
              </div>

              <span
                class="line-clamp-2 font-lato text-sm leading-6 text-gray-800"
              >
                {{ option.value }}
              </span>

              <div
                class="flex gap-3 opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100"
              >
                <UButton
                  square
                  color="gray"
                  variant="ghost"
                  @click.stop="toggleEditCategory(index)"
                >
                  <NuxtIcon
                    name="common/pencil"
                    class="text-lg"
                    filled
                    aria-hidden="true"
                  />
                </UButton>
                <UButton color="gray" square variant="ghost">
                  <NuxtIcon
                    name="common/trash"
                    class="text-lg"
                    filled
                    aria-hidden="true"
                  />
                </UButton>
              </div>
            </li>
          </RadioGroupOption>
        </RadioGroup>
      </UFormGroup>

      <!-- Add Category Input Field -->
      <div
        :class="{
          'grid w-full grid-rows-[0] overflow-clip px-3 transition-all duration-150 ease-in': true,
          'grid-rows-[125px]': isAddCategory,
        }"
      >
        <UForm
          v-show="isAddCategory"
          :state="categoryForm"
          @submit="handleAddCategory"
        >
          <UFormGroup>
            <template #description>
              <span class="font-lato text-xs leading-6 text-gray-600">
                Tekan enter untuk menambahkan.
              </span>
            </template>

            <UInput v-model="categoryForm.newCategory" autofocus />

            <template #help>
              <span class="font-lato text-xs leading-none text-gray-400">
                Sisa karakter: 10 dari 125
              </span>
            </template>
          </UFormGroup>
        </UForm>
      </div>

      <UDivider class="mb-[14px]" />

      <!-- Add Category Button -->
      <div class="mb-[14px] flex w-full justify-end">
        <UButton
          v-if="isAddCategory"
          color="gray"
          variant="ghost"
          @click="toggleAddCategory"
        >
          <template #leading>
            <NuxtIcon name="common/close" aria-hidden="true" class="text-xl" />
          </template>
          Batalkan
        </UButton>

        <UButton v-else variant="ghost" @click="toggleAddCategory">
          <template #leading>
            <NuxtIcon
              name="common/plus"
              class="text-md text-green-600"
              aria-hidden="true"
            />
          </template>
          Tambah Kategori
        </UButton>
      </div>

      <!-- Tags Input Field -->
      <UForm :state="tagForm" class="mb-2.5 mt-5" @submit="handleAddTag">
        <UFormGroup label="Tag" hint="(Opsional)" name="tag">
          <UInput v-model="tagForm.tag" placeholder="Masukkan Tag" />
        </UFormGroup>
      </UForm>

      <ul
        class="flex min-h-[34px] w-full flex-wrap gap-1 rounded-lg border p-2"
      >
        <li
          v-for="tag in tags"
          :key="tag"
          class="min-h-5 flex items-center justify-center rounded-full bg-gray-200 py-1 pl-2.5 pr-1"
        >
          <span class="font-lato text-sm leading-none text-gray-600">
            {{ tag }}
          </span>
          <button class="relative top-[1px] ml-2" @click="handleDeleteTag">
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

  <!-- Edit Category Modal -->
  <BaseModal
    :modal-ui="{
      width: 'w-[400px]',
    }"
    header="Ubah Kategori"
    :open="isEditCategory"
  >
    <p class="mb-3">
      Masukkan nama baru untuk kategori
      <strong>
        {{ getCategoryLabel(categoryForm.categoryIndex) }}
      </strong>
    </p>

    <UForm :state="categoryForm" @submit="handleEditCategory">
      <UFormGroup>
        <UInput v-model="categoryForm.newCategory" />
      </UFormGroup>
    </UForm>

    <template #footer>
      <UButton
        type="button"
        variant="outline"
        @click="toggleEditCategory(categoryForm.categoryIndex)"
      >
        Batal
      </UButton>
      <UButton type="button" @click="handleEditCategory">
        Ubah Kategori
      </UButton>
    </template>
  </BaseModal>

  <!-- Image Preview -->
  <BaseModal
    :open="isPreviewImage"
    with-close-button
    @close="togglePreviewImage"
  >
    <NuxtImg
      :src="postStore.form.image.uri"
      :alt="postStore.form.image.filename"
      class="h-full w-full"
    />

    <template #footer>
      <UButton type="button" @click="togglePreviewImage"> Tutup </UButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import Editor from '@tinymce/tinymce-vue'
  import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
  import { usePostStore } from '~/stores/post'
  import { validateImage } from '~/common/helpers/validation'
  import z from 'zod'

  const config = useRuntimeConfig()
  const siteStore = useSiteStore()
  const postStore = usePostStore()
  const { $jSiteApi } = useNuxtApp()

  const tinyMCEConfig = Object.freeze({
    'api-key': config.public.tinyMceApiKey,
    init: {
      height: 500,
      placeholder: 'Tulis isi post di sini',
      language_url: '/tinymce/langs/id.js',
      language: 'id',
      skin_url: '/tinymce/skins',
      menubar: 'false',
      plugins: 'preview fullscreen lists link image media',
      toolbar: `
      undo redo | blocks | bold italic bullist numlist blockquote |
      alignleft aligncenter alignright alignjustify |
      link strikethrough indent outdent image media |
      preview fullscreen`,
      toolbar_mode: 'sliding',
      image_caption: true,
      paste_block_drop: true,
      invalid_elements: 'div',
    },
  })

  const isEditCategory = ref(false)

  const isAddCategory = ref(false)

  // TODO: remove this dummy category
  const categories = reactive([
    {
      value: 'Pendidikan',
    },
    {
      value: 'Kesehatan',
    },
    {
      value: 'Sosial Politik',
    },
  ])

  const categoryForm = reactive({
    newCategory: '',
    categoryIndex: null as number | null,
  })

  async function toggleEditCategory(index: number | null) {
    isEditCategory.value = !isEditCategory.value

    if (isEditCategory && index !== null) {
      categoryForm.newCategory = categories[index].value
      categoryForm.categoryIndex = index
    } else {
      categoryForm.newCategory = ''
      categoryForm.categoryIndex = null
    }
  }

  function handleEditCategory() {
    // TODO: handle edit category
  }

  function getCategoryLabel(index: number | null) {
    if (index !== null) {
      return categories[index].value
    }
  }

  function toggleAddCategory() {
    isAddCategory.value = !isAddCategory.value
  }

  function handleAddCategory() {
    // TODO: handle add category
  }

  const tags: string[] = reactive([])

  const tagForm = reactive({
    tag: '',
  })

  function handleAddTag() {
    // TODO: store tag to API
    tags.push(tagForm.tag)
    tagForm.tag = ''
  }

  function handleDeleteTag() {
    // TODO: handle delete tag
  }

  const title = computed({
    get() {
      return postStore.form.title
    },
    set(value) {
      postStore.setTitle(value)
    },
  })

  const content = computed({
    get() {
      return postStore.form.content
    },
    set(value) {
      postStore.setContent(value)
    },
  })

  const author = computed({
    get() {
      return postStore.form.author
    },
    set(value) {
      postStore.setAuthor(value)
    },
  })

  const category = computed({
    get() {
      return postStore.form.category
    },
    set(value) {
      postStore.setCategory(value)
    },
  })

  const image = computed(() => {
    return postStore.form.image
  })

  const dropzoneErrorMessages = ref<string[]>([])
  const isDropzoneUploading = ref(false)

  async function handleImageChange(image: File) {
    if (!image) return

    try {
      isDropzoneUploading.value = true
      dropzoneErrorMessages.value = []

      await validateImage(image, {
        maxSize: 1048576, // 1MB
        maxWidth: 1080, // 1024 pixel
        maxHeight: 720, // 576 pixel
      })

      const formData = new FormData()

      formData.append('file', image)
      formData.append('caption', 'post')
      formData.append('category', 'post')
      formData.append('setting_id', siteStore.siteId ?? '')

      const response = await uploadImage(formData)
      const { file, id } = response?.value?.data ?? {}

      if (file && id) {
        postStore.setImage({
          id,
          uri: file.uri,
          filename: file.filename,
        })
      }
    } catch (error) {
      resetDropzone()
      if (error instanceof z.ZodError) {
        dropzoneErrorMessages.value = error.issues.map((err) => err.message)
      } else {
        console.error(error)
      }
    } finally {
      isDropzoneUploading.value = false
    }
  }

  async function uploadImage(formData: FormData) {
    const {
      data: uploadResponse,
      status,
      error,
    } = await $jSiteApi.media.uploadMedia(formData, undefined, {
      server: false,
    })

    if (status.value === 'success') {
      return uploadResponse
    } else if (status.value === 'error') {
      throw error
    }
  }

  async function handleDeleteImage() {
    try {
      await deleteUploadedImage(postStore.form.image.id)
      resetDropzone()
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteUploadedImage(id: string) {
    const { status, error } = await $jSiteApi.media.deleteMedia(id, undefined, {
      server: false,
    })

    if (status.value === 'error') {
      throw error
    }
  }

  function resetDropzone() {
    postStore.setImage({ id: '', uri: '', filename: '' })
  }

  const isPreviewImage = ref(false)

  function togglePreviewImage() {
    isPreviewImage.value = !isPreviewImage.value
  }
</script>

<template>
  <!-- Category Radio Buttons -->
  <UFormGroup label="Kategori" class="py-5" name="category">
    <!-- Skeletons -->
    <div v-if="isCategoryLoading" class="flex h-[200px] flex-col gap-2 py-5">
      <div
        v-for="index in 3"
        :key="index"
        class="h-[42px] w-full animate-pulse bg-gray-100"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="isCategoriesEmpty && !isCategoryLoading"
      class="flex h-[150px] flex-col items-center justify-center"
    >
      <NuxtIcon
        name="common/category"
        class="mb-2.5 text-2xl"
        aria-hidden="true"
        filled
      />
      <p class="font-lato text-sm leading-6 text-gray-400">
        Belum ada Kategori
      </p>
    </div>

    <!-- Options -->
    <RadioGroup v-else v-model="category" class="max-h-[200px] overflow-y-auto">
      <RadioGroupOption
        v-for="option in categories"
        :key="option.id"
        v-slot="{ checked }"
        :value="option.id"
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

          <span class="line-clamp-2 font-lato text-sm leading-6 text-gray-800">
            {{ option.name }}
          </span>

          <div
            class="flex gap-3 opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100"
          >
            <UButton
              square
              color="gray"
              variant="ghost"
              @click.stop="handleEditCategory(option.id)"
            >
              <NuxtIcon
                name="common/pencil"
                class="text-lg"
                filled
                aria-hidden="true"
              />
            </UButton>
            <UButton
              color="gray"
              square
              variant="ghost"
              :disabled="!option.is_deletable"
              @click.stop="handleDeleteCategory(option.id)"
            >
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
    <UFormGroup :error="categoryErrorMessage" name="new-category">
      <template #description>
        <span class="font-lato text-xs leading-6 text-gray-600">
          Tekan enter untuk menambahkan.
        </span>
      </template>

      <UInput
        v-model="newCategoryForm.name"
        :loading="isCategoryLoading"
        autofocus
        maxlength="125"
        @keyup.enter.stop="handleAddCategory"
      />

      <template #help>
        <span class="font-lato text-xs leading-none text-gray-400">
          Sisa karakter: {{ 125 - newCategoryForm.name.length }} dari 125
        </span>
      </template>
    </UFormGroup>
  </div>

  <UDivider class="mb-[14px]" />

  <!-- Add Category Button -->
  <div class="mb-[14px] flex w-full justify-end">
    <UButton
      v-if="isAddCategory"
      color="gray"
      variant="ghost"
      @click="closeAddCategorySection"
    >
      <template #leading>
        <NuxtIcon name="common/close" aria-hidden="true" class="text-xl" />
      </template>
      Batalkan
    </UButton>

    <UButton v-else variant="ghost" @click="openAddCategorySection">
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

  <!-- Edit Category Modal -->
  <BaseModal
    :modal-ui="{
      width: 'w-[400px]',
    }"
    header="Ubah Kategori"
    :open="isEditCategory"
  >
    <p class="text-md mb-3 font-lato leading-6 text-gray-800">
      Masukkan nama baru untuk kategori
      <strong>
        {{ getCategoryLabel(editCategoryForm.id) }}
      </strong>
    </p>

    <UFormGroup>
      <UInput v-model.trim="editCategoryForm.name" maxlength="125" />

      <template #help>
        <span class="font-lato text-xs leading-none text-gray-400">
          Sisa karakter: {{ 125 - editCategoryForm.name.length }} dari 125
        </span>
      </template>
    </UFormGroup>

    <template #footer>
      <UButton type="button" variant="outline" @click="closeEditCategory">
        Batal
      </UButton>
      <UButton
        type="button"
        :disabled="editCategoryForm.name.length === 0"
        @click="editCategory"
      >
        Ubah Kategori
      </UButton>
    </template>
  </BaseModal>

  <!-- Delete Category Modal -->
  <BaseModal
    :modal-ui="{
      width: 'w-[400px]',
    }"
    header="Hapus Kategori"
    :open="isDeleteCategory"
  >
    <p class="text-md mb-3 font-lato leading-6 text-gray-800">
      Apakah anda yakin ingin menghapus kategori
      <strong>
        {{ deleteCategoryForm.name }}
      </strong>
      ?
    </p>

    <template #footer>
      <UButton type="button" variant="outline" @click="closeDeleteCategory">
        Batal
      </UButton>
      <UButton type="button" @click="deleteCategory"> Hapus Kategori </UButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
  import { ICategory } from '~/repository/j-site/types/category'

  const { $jSiteApi } = useNuxtApp()
  const siteStore = useSiteStore()
  const postStore = usePostStore()

  onMounted(() => {
    fetchCategories()
  })

  const category = computed({
    get() {
      return postStore.form.category
    },
    set(value) {
      postStore.setCategory(value)
    },
  })

  const isEditCategory = ref(false)

  const isAddCategory = ref(false)

  const isDeleteCategory = ref(false)

  const isCategoryLoading = ref(true)

  const categories = ref<ICategory[]>([])

  const isCategoriesEmpty = computed(() => {
    return categories.value.length === 0
  })

  const categoryErrorMessage = ref<string>()

  async function fetchCategories() {
    isCategoryLoading.value = true

    const {
      data: categoriesResponse,
      status,
      error,
    } = await $jSiteApi.category.getCategories(
      siteStore.siteId ?? '',
      undefined,
      { server: false },
    )

    if (status.value === 'success') {
      categories.value = categoriesResponse?.value?.data ?? []
    }

    if (status.value === 'error') {
      console.error(error)
    }

    setTimeout(() => {
      isCategoryLoading.value = false
    }, 300)
  }

  const editCategoryForm = reactive({
    id: '',
    name: '',
  })

  function handleEditCategory(categoryId: string) {
    isEditCategory.value = true

    const category = getCategoryById(categoryId)

    editCategoryForm.name = category?.name ?? ''
    editCategoryForm.id = category?.id ?? ''
  }

  function closeEditCategory() {
    isEditCategory.value = false
    editCategoryForm.name = ''
    editCategoryForm.id = ''
  }

  async function editCategory() {
    isCategoryLoading.value = true

    const body = {
      name: editCategoryForm.name,
    }

    const { status, error } = await $jSiteApi.category.updateCategory(
      siteStore.siteId ?? '',
      editCategoryForm?.id ?? '',
      body,
      { server: false },
    )

    if (status.value === 'success') {
      // TODO: add success toast
    }

    if (status.value === 'error') {
      console.error(error)
    }

    closeEditCategory()
    fetchCategories()
  }

  function getCategoryById(categoryId: string) {
    return categories.value.find((category) => category.id === categoryId)
  }

  function getCategoryLabel(categoryId: string) {
    const category = getCategoryById(categoryId)
    return category?.name
  }

  const newCategoryForm = reactive({
    name: '',
  })

  function openAddCategorySection() {
    isAddCategory.value = true
  }

  function closeAddCategorySection() {
    isAddCategory.value = false
    newCategoryForm.name = ''
    categoryErrorMessage.value = ''
  }

  async function handleAddCategory() {
    const { status, error } = await $jSiteApi.category.createCategory(
      siteStore.siteId ?? '',
      newCategoryForm,
      { server: false },
    )

    if (status.value === 'success') {
      // TODO: add success toast
      newCategoryForm.name = ''
      categoryErrorMessage.value = ''
    }

    if (status.value === 'error') {
      console.error(error)
      categoryErrorMessage.value = 'Kategori yang Anda masukkan sudah tersedia'
    }

    fetchCategories()
  }

  const deleteCategoryForm = reactive({
    id: '',
    name: '',
  })

  function handleDeleteCategory(categoryId: string) {
    isDeleteCategory.value = true

    const category = getCategoryById(categoryId)

    deleteCategoryForm.id = category?.id ?? ''
    deleteCategoryForm.name = category?.name ?? ''
  }

  function closeDeleteCategory() {
    isDeleteCategory.value = false

    deleteCategoryForm.id = ''
    deleteCategoryForm.name = ''
  }

  async function deleteCategory() {
    const { status, error } = await $jSiteApi.category.deleteCategory(
      siteStore?.siteId ?? '',
      deleteCategoryForm.id,
      { server: false },
    )

    if (status.value === 'success') {
      if (postStore.form.category === deleteCategoryForm.id) {
        postStore.setCategory('')
      }
      // TODO: add success toast
    }

    if (status.value === 'error') {
      console.error(error)
    }

    closeDeleteCategory()
    fetchCategories()
  }

  // Reset error message when new category input empty
  watch(
    () => newCategoryForm.name,
    (value) => {
      if (value !== '') return
      categoryErrorMessage.value = ''
    },
  )
</script>

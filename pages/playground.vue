<template>
  <main class="mx-auto max-w-3xl py-20">
    <h1 class="text-lg">Buttons</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <UButton>Default</UButton>
      <UButton variant="outline">Default</UButton>
      <UButton color="red">Default</UButton>
      <UButton color="red" variant="outline">Default</UButton>
      <UButton block>Default</UButton>
      <UButton disabled loading block>Default</UButton>
    </div>

    <h1 class="text-lg">Link Button</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <UButton to="/">Home</UButton>
      <UButton to="https://google.com" target="_blank" variant="outline">
        Google
      </UButton>
      <UButton color="red" variant="outline" @click="$router.back()">
        Kembali
      </UButton>
    </div>

    <h1 class="text-lg">Input Text</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <BaseInput
        v-model="input"
        label="Masukkan Judul"
        placeholder="Masukkan Judul..."
      />
      <BaseInput
        label="Masukkan Nama"
        placeholder="Input nama Anda"
        :errors="['Tidak boleh mengandung Angka!']"
      />
      <BaseInput
        label="Masukkan Password"
        placeholder="Input password Anda"
        type="password"
        :errors="['Password yang Anda masukkan Salah!']"
      />
      <BaseInput label="Masukkan URL" placeholder="Input URL Anda">
        <template #leading>
          <NuxtIcon
            name="common/globe"
            class="text-xl text-gray-600"
            aria-hidden="true"
          />
        </template>
      </BaseInput>
    </div>

    <h1 class="text-lg">Search Bar</h1>
    <div class="mb-8 flex flex-wrap gap-x-8 gap-y-8 py-2">
      <BaseSearchBar
        v-model="search"
        label="Cari Judul Artikel"
        placeholder="Masukkan Judul..."
      />
    </div>

    <h1 class="mb-4 text-lg">Simple Table</h1>
    <div class="mb-8 w-full">
      <UTable :rows="people" :columns="columns" />
    </div>

    <h1 class="mb-4 text-lg">Pagination</h1>
    <div class="mb-8 w-full">
      <BasePagination
        :current-page="pagination.currentPage"
        :total-rows="pagination.totalRows"
        :total-page="pagination.totalPage"
        :limit="pagination.itemsPerPage"
        :limit-options="['5', '10', '15', '20']"
        @change-limit="pagination.itemsPerPage = $event"
        @change-page="pagination.currentPage = $event"
        @next-page="pagination.currentPage++"
        @previous-page="pagination.currentPage--"
      />
      <br />
      <p>{{ JSON.stringify(pagination) }}</p>
    </div>

    <h1>Select</h1>
    <div class="mb-8 flex w-full flex-col gap-4">
      <BaseSelect
        v-model="selected"
        label="Select Item"
        helper="Pilih satu"
        placeholder="Item yang tersedia"
        :options="names"
      />
      <BaseSelect
        v-model="selected"
        label="Select Item"
        helper="Pilih satu"
        placeholder="Item yang tersedia"
        :errors="['Wajib diisi!']"
        :options="names"
      />
      <BaseSelect
        v-model="selected"
        label="Select Item"
        helper="Pilih satu"
        placeholder="Item yang tersedia"
        :options="names"
        disabled
      />
      <BaseSelect
        v-model="selected"
        label="Select Item dengan search item"
        helper="Pilih satu"
        placeholder="Item yang tersedia"
        :options="names"
        searchable
      >
        <template #option-empty="{ query }">
          "{{ query }}" tidak ditemukan
        </template>
      </BaseSelect>
    </div>

    <h1>Textarea</h1>
    <div class="mb-8 flex w-full flex-col gap-4">
      <BaseTextarea
        v-model="inputTextarea"
        helper="Teks Helper"
        label="Label input"
        placeholder="Teks Placeholder"
        :max-length="100"
      />
      <BaseTextarea
        v-model="inputTextarea"
        helper="Teks Helper"
        label="Label input"
        placeholder="Teks Placeholder"
        :max-length="100"
      />
      <BaseTextarea
        v-model="inputTextarea"
        disabled
        :errors="['Wajib diisi!']"
        helper="Teks Helper"
        label="Label input"
        placeholder="Teks Placeholder"
        :max-length="100"
      />
      <BaseTextarea
        v-model="inputTextarea"
        helper="Teks Helper"
        label="Label input"
        placeholder="Teks Placeholder"
        :max-length="100"
      />
    </div>

    <h1>Drag & Drop Dropzone</h1>
    <div class="mb-8 flex w-full flex-col gap-4">
      <h3>
        Ukuran maksimal file adalah 1 MB dengan resolusi 1080 x 720 . File yang
        didukung adalah .jpg dan .png
      </h3>
      <div class="dropzone" v-bind="getRootProps()">
        <div
          :class="{
            'flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-2 pb-[23px] pt-2': true,
            isDragActive,
          }"
        >
          <input v-bind="getInputProps()" />
          <span v-if="isDragActive"> Drop here .... </span>
          <div v-else class="flex flex-col items-center justify-center gap-y-4">
            <img
              width="30"
              height="30"
              src="@/assets/icons/common/plus-circle.svg"
              alt="icon tambah dengan lingkaran"
            />
            <p class="text-center">
              Seret dan lepaskan file disini, <br />
              atau
              <u class="text-blue-500">klik untuk upload</u>
            </p>
          </div>
        </div>
      </div>

      <div v-if="state.files.length > 0" class="fils">
        <div
          v-for="(file, index) in state.files"
          :key="index"
          class="file-item flex max-w-[440px] flex-row items-center justify-between rounded-lg border p-2"
        >
          <span>{{ file.name }}</span>
          <NuxtIcon size="30" name="common/eye" />
          <UButton
            class="delete-file inline"
            @click="handleClickDeleteFile(index)"
          >
            <NuxtIcon name="common/close" />
          </UButton>
        </div>
      </div>
      <p v-else>Belum ada file terpilih</p>
    </div>

    <h1>Drag & Drop Dropzone Base Csomponent</h1>
    <div class="mb-8 flex w-full flex-col gap-4">
      <BaseDropzone
        :files="state.fileDropzone"
        accept=".jpg, .png, .webp"
        :disabled="state.dropzoneDisable"
        :multiple="state.dropzoneMultiple"
        @change:files="onDropFile($event)"
        @delete:files="deleteFile($event)"
      />
      <BaseDropzoneFile />
    </div>

    <h1>Date Picker</h1>
    <div class="mb-8 flex w-full flex-row justify-between">
      <BaseCalendar class="w-[178px]" />
      <BaseCalendar class="w-[178px]" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useDropzone } from 'vue3-dropzone'
  import type { FileRejectReason } from 'vue3-dropzone'

  definePageMeta({
    layout: 'public',
  })

  const state = reactive({
    files: [],
    fileDropzone: [] as File[],
    errorDropzone: [],
    dropzoneDisable: false,
    dropzoneMultiple: true,
  })

  function onDropFile(event: { acceptFiles: File[] }) {
    const { acceptFiles } = event
    state.fileDropzone = acceptFiles
  }

  function deleteFile(index: number) {
    state.fileDropzone.splice(index, 1)
  }

  const options = reactive({
    multiple: false,
    accept: '.jpg,.png',
    maxSize: 1024 * 1024, // 1 MB, 1 KB = 1024 Byte
    disabled: false,
    onDrop,
  })

  const { getRootProps, getInputProps, isDragActive, ...rest } =
    useDropzone(options)

  watch(isDragActive, () => {
    console.log('isDragActive', isDragActive.value, rest)
  })

  function onDrop(acceptFiles: File[], rejectReasons: FileRejectReason[]) {
    if (acceptFiles.length > 0) {
      state.files = acceptFiles as never[]
    }
    const errors = rejectReasons[0]?.errors ?? ''
    const error = errors[0]
    if (typeof error === 'object') {
      alert(error?.message ?? '')
    }
  }

  function handleClickDeleteFile(index: number) {
    state.files.splice(index, 1)
  }
  const search = ref('')
  const input = ref('')
  const inputTextarea = ref('')

  const names = [
    'Wade Cooper',
    'Arlene Mccoy',
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
    'Caroline Schultz',
    'Mason Heaney',
    'Claudie Smitham',
    'Emil Schaefer',
  ]
  const selected = ref('')

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'Role',
    },
  ]

  const people = [
    {
      id: 1,
      name: 'Lindsay Walton',
      title:
        'Front-end Developer Teksnya Panjang Banget Sampe Gak Muat ke Kanan Lagi Gaes',
      email: 'lindsay.walton@example.com',
      role: 'Member',
    },
    {
      id: 2,
      name: 'Courtney Henry',
      title: 'Designer',
      email: 'courtney.henry@example.com',
      role: 'Admin',
    },
    {
      id: 3,
      name: 'Tom Cook',
      title: 'Director of Product',
      email: 'tom.cook@example.com',
      role: 'Member',
    },
    {
      id: 4,
      name: 'Whitney Francis',
      title: 'Copywriter',
      email: 'whitney.francis@example.com',
      role: 'Admin',
    },
    {
      id: 5,
      name: 'Leonard Krasner',
      title: 'Senior Designer',
      email: 'leonard.krasner@example.com',
      role: 'Owner',
    },
    {
      id: 6,
      name: 'Floyd Miles',
      title: 'Principal Designer',
      email: 'floyd.miles@example.com',
      role: 'Member',
    },
  ]

  const pagination = reactive({
    totalRows: 100,
    currentPage: 1,
    itemsPerPage: 10,
    totalPage: 20,
  })
</script>

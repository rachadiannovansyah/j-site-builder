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
    <div class="mb-8 w-full flex flex-col gap-4">
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
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'public',
  })

  const search = ref('')
  const input = ref('')
  
  const names = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
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

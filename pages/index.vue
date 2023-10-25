<template>
  <div class="h-[2000px] p-8">
    <h1 class="mb-4 text-2xl font-bold">
      Users data from JSON PLACEHOLDER API
    </h1>
    <p v-if="state.loading">Loading...</p>
    <div v-for="user in state.users" :key="user.id">
      <p>{{ user.name }} - {{ user.email }}</p>
    </div>
    <div class="mb-8"></div>

    <h1 class="mb-4 text-2xl font-bold">Products data from DUMMY JSON API</h1>
    <p v-if="state.loading">Loading...</p>
    <div v-for="product in state.products?.products" :key="product.id">
      <p>{{ product.title }} - {{ product.brand }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IUserResponse } from '~/repository/json-placeholder/type'
  import { IProductResponse } from '~/repository/dummy-json/modules/type'

  definePageMeta({
    title: 'Beranda',
  })

  const { $jsonPlaceholderApi, $dummyJsonApi } = useNuxtApp()

  const state = reactive({
    users: null as IUserResponse | null,
    products: null as IProductResponse | null,
    loading: false,
    error: false,
  })

  onMounted(() => {
    getUsers()
    getProducts()
  })

  async function getUsers() {
    try {
      state.loading = true
      const response = await $jsonPlaceholderApi.users.getUsers({
        server: false,
      })

      state.users = response.data.value
    } catch (error) {
      console.error(error)
    } finally {
      state.loading = false
    }
  }

  async function getProducts() {
    try {
      state.loading = true
      const response = await $dummyJsonApi.products.getProducts({
        server: false,
      })

      state.products = response.data.value
    } catch (error) {
      console.error(error)
    } finally {
      state.loading = false
    }
  }
</script>

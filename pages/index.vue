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

    <h1></h1>
  </div>
</template>

<script setup lang="ts">
  import { IUserResponse } from '~/repository/json-placeholder/type'

  definePageMeta({
    title: 'Beranda',
  })

  const { $jsonPlaceholderApi } = useNuxtApp()

  const state = reactive({
    users: null as null | IUserResponse,
    loading: false,
    error: false,
  })

  onMounted(() => {
    getUsers()
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
</script>

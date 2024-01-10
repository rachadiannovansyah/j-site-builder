<template>
  <div class="rounded-lg bg-white p-[14px]">
    <p
      class="mb-[14px] font-roboto text-base font-medium leading-6 text-green-700"
    >
      Judul
    </p>
    <UFormGroup name="title">
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
</template>

<script lang="ts" setup>
  const postStore = usePostStore()

  const title = computed({
    get() {
      return postStore.form.title
    },
    set(value) {
      postStore.setTitle(value)
    },
  })
</script>

<template>
  <div>
    <nav class="mb-[14px] flex items-center justify-between">
      <UButton variant="outline">
        <template #leading>
          <NuxtIcon
            name="common/arrow-left"
            aria-hidden="true"
            class="text-xl"
          />
        </template>
        Kembali
      </UButton>
      <div class="flex gap-x-[14px]">
        <UButton variant="outline">
          <template #leading>
            <NuxtIcon name="common/folder" aria-hidden="true" class="text-xl" />
          </template>
          Simpan ke Draft
        </UButton>
        <UButton>
          <template #leading>
            <NuxtIcon name="common/file" aria-hidden="true" class="text-xl" />
          </template>
          Terbitkan Post
        </UButton>
      </div>
    </nav>

    <PostForm />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Posting',
  })
</script>

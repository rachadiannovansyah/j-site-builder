<template>
  <PostForm @submit-form="handlePublish">
    <template #header>
      <nav class="mb-[14px] flex items-center justify-between py-[14px]">
        <UButton variant="outline" @click="goBack">
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
          <UButton variant="outline" type="button" @click="handleSaveAsDraft">
            <template #leading>
              <NuxtIcon
                name="common/folder"
                aria-hidden="true"
                class="text-xl"
              />
            </template>
            Simpan ke Draft
          </UButton>
          <UButton type="submit">
            <template #leading>
              <NuxtIcon name="common/file" aria-hidden="true" class="text-xl" />
            </template>
            Terbitkan Post
          </UButton>
        </div>
      </nav>
    </template>
  </PostForm>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Posting',
  })

  function goBack() {
    // TODO: handle router go back
  }

  function handlePublish() {
    // TODO: add save as published handler
  }

  function handleSaveAsDraft() {
    // TODO: add save as draft handler
  }
</script>

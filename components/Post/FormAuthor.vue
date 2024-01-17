<template>
  <UFormGroup label="Nama Penulis" class="mb-[14px]" name="author">
    <UInput
      v-model="author"
      placeholder="Masukkan Nama Penulis"
      maxlength="150"
      data-cy="post-form__author-section__input-text"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
  const postStore = usePostStore()

  const author = computed({
    get() {
      return postStore.form.author
    },
    set(value) {
      postStore.setAuthor(value)
    },
  })
</script>

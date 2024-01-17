<template>
  <div class="rounded-lg bg-white p-[14px]">
    <p
      class="mb-[14px] font-roboto text-base font-medium leading-6 text-green-700"
      data-cy="post-form__title-section__title"
    >
      Judul
    </p>
    <UFormGroup name="title">
      <UTextarea
        v-model="title"
        :rows="2"
        placeholder="Masukkan judul post"
        data-cy="post-form__title-section__input-text"
        maxlength="255"
      />
      <template #help>
        <span
          class="font-lato text-xs text-gray-600"
          data-cy="post-form__title-section__remaining-chars"
        >
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

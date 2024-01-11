<template>
  <UForm
    ref="postForm"
    :schema="schema"
    :state="form"
    :validate-on="['submit', 'blur']"
    @submit="emit('submit-form')"
    @keydown.enter="$event.preventDefault()"
    @keyup.enter="$event.preventDefault()"
  >
    <slot name="header" :valid="valid"></slot>

    <section class="grid grid-cols-[1fr,364px] gap-2.5">
      <div class="grid grid-cols-1 gap-y-2.5">
        <PostFormTitle />
        <PostFormImage />
        <PostFormContent />
      </div>

      <div class="rounded-lg bg-white p-[14px]">
        <p
          class="mb-[14px] font-roboto text-base font-medium leading-6 text-green-700"
        >
          Nama, Kategori dan Tag
        </p>
        <PostFormAuthor />
        <PostFormCategory />
        <PostFormTags />
      </div>
    </section>
  </UForm>
</template>

<script setup lang="ts">
  import { z } from 'zod'
  import debounce from 'lodash.debounce'

  const postStore = usePostStore()

  const form = computed(() => {
    return postStore.form
  })

  const schema = z.object({
    title: z
      .string({ required_error: 'Judul berita tidak boleh kosong ' })
      .trim()
      .min(3, 'Judul berita harus lebih dari 3 karakter'),
    image: z
      .object({
        id: z.string(),
        uri: z.string(),
        filename: z.string(),
      })
      .refine(
        (data) => {
          return data.uri !== ''
        },
        { message: 'Gambar tidak boleh kosong' },
      ),
    content: z.string().trim().min(1, 'Konten tidak boleh kosong'),
    author: z
      .string()
      .trim()
      .min(3, 'Nama penulis harus lebih dari 3 karakter')
      .regex(/^[a-zA-Z]*$/, 'Nama tidak boleh mengandung simbol atau angka'),
    category: z.string().trim().min(1, 'Kategori tidak boleh kosong'),
  })

  const valid = ref(false)

  const emit = defineEmits(['submit-form'])

  // Check valid status when form change
  watch(
    form,
    debounce(() => {
      valid.value = schema.safeParse(form.value).success
    }, 500),
    { immediate: true, deep: true },
  )
</script>

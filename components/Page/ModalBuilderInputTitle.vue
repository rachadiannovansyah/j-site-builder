<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[750px]' }"
  >
    <UForm :schema="formSchema" :state="form" @submit="onSave">
      <UCard
        :ui="{
          body: {
            padding: 'sm:py-4 sm:px-0',
          },
          header: {
            padding: 'sm:py-4 sm:px-6',
          },
          footer: {
            padding: 'sm:py-4 sm:px-6',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="font-roboto text-xl font-medium leading-8 text-green-800"
            >
              Isi Judul Section
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="onCancel"
            />
          </div>
        </template>

        <section class="grid grid-cols-1 gap-y-4">
          <NuxtImg
            src="/images/illustration-title-input.svg"
            width="548"
            height="345"
            class="justify-self-center"
            alt="Ilustrasi gambar faq"
          />
          <div class="mx-6 gap-y-[10px] px-4 py-[14px]">
            <UFormGroup label="Judul (Opsional)" name="title">
              <UInput
                v-model="form.title"
                placeholder="Masukkan judul"
                color="gray"
              />
              <template #help>
                Tersisa {{ titleLengthRemaining }} Karakter
              </template>
            </UFormGroup>
            <UFormGroup label="Deskripsi (Opsional)" name="description">
              <UTextarea
                v-model="form.description"
                placeholder="Masukkan deskripsi"
                color="gray"
                :rows="5"
              />
              <template #help>
                Tersisa {{ descriptionLengthRemaining }} Karakter
              </template>
            </UFormGroup>
          </div>
        </section>

        <template #footer>
          <section class="flex justify-between">
            <UButton
              type="button"
              variant="ghost"
              color="gray"
              @click="onCancel"
            >
              Batalkan
            </UButton>
            <div class="flex gap-x-4">
              <UButton
                type="button"
                color="red"
                variant="outline"
                :disabled="isFormInputEmpty"
                @click="onRemove"
              >
                <template #leading>
                  <NuxtIcon name="common/trash" size="50" aria-hidden="true" />
                </template>
                Hapus
              </UButton>
              <UButton type="submit"> Simpan </UButton>
            </div>
          </section>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<script setup lang="ts">
  import { z } from 'zod'

  const pageStore = usePageStore()

  const MAX_TITLE_LENGTH = 250
  const MAX_DESCRIPTION_LENGTH = 500

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    sectionIndex: {
      type: Number,
      default: null,
    },
  })

  const form = reactive({
    title: '',
    description: '',
  })

  const isFormInputEmpty = computed(() => {
    return form.title.length === 0 && form.description.length === 0
  })

  const formSchema = z.object({
    title: z.string().max(250, 'Judul maksimal 250 Karakter').optional(),
    description: z
      .string()
      .max(500, 'Deskripsi maksimal 250 Karakter')
      .optional(),
  })

  function onSave() {
    pageStore.setSectionTitle({
      sectionIndex: props.sectionIndex,
      title: form.title,
    })
    pageStore.setSectionDescription({
      sectionIndex: props.sectionIndex,
      description: form.description,
    })
    emit('close')
  }

  function onClearInput() {
    form.title = ''
    form.description = ''
    pageStore.setSectionTitle({
      sectionIndex: props.sectionIndex,
      title: '',
    })
    pageStore.setSectionDescription({
      sectionIndex: props.sectionIndex,
      description: '',
    })
  }

  function onRemove() {
    onClearInput()
  }

  function onCancel() {
    form.title = ''
    form.description = ''
    emit('close')
  }

  const titleLengthRemaining = computed(() => {
    return MAX_TITLE_LENGTH - form.title.length
  })
  const descriptionLengthRemaining = computed(() => {
    return MAX_DESCRIPTION_LENGTH - form.description.length
  })

  const emit = defineEmits(['close'])
</script>

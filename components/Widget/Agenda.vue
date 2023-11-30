<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[750px]' }"
  >
    <UForm :schema="formSchema" :state="form" @submit="onSave">
      <UCard
        :ui="{
          header: {
            padding: 'sm:py-4',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="font-roboto text-xl font-medium leading-8 text-green-800"
            >
              Pengaturan Agenda
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="$emit('close')"
            />
          </div>
        </template>

        <div class="mb-4 flex justify-center">
          <img
            width="434"
            height="288"
            alt="ilustrasi widget agenda"
            src="/images/widget/agenda-illustration.svg"
            class="h-[288px] w-[434px]"
          />
        </div>

        <div class="mb-4 flex flex-col gap-[14px]">
          <UFormGroup label="Judul Agenda" name="title">
            <UInput
              v-model="form.title"
              placeholder="Masukkan judul"
              maxlength="50"
            />
            <template #help>
              <span class="font-lato text-xs text-gray-600">
                Tersisa {{ titleLengthRemaining }} karakter
              </span>
            </template>
          </UFormGroup>

          <UFormGroup label="Deskripsi (Opsional)" name="description">
            <UTextarea
              v-model="form.description"
              placeholder="Masukkan deskripsi"
              :rows="5"
              maxlength="100"
            />
            <template #help>
              <span class="font-lato text-xs text-gray-600">
                Tersisa {{ descriptionLengthRemaining }} karakter
              </span>
            </template>
          </UFormGroup>

          <UFormGroup label="Aktifkan Agenda">
            <div class="flex items-center justify-between">
              <span class="font-lato text-sm text-gray-600">
                Data Agenda akan diambil dari agenda portal jabar yang sudah
                disesuaikan dengan OPD
              </span>
              <div class="ml-4">
                <UToggle v-model="form.isActive" class="flex-shrink-0" />
              </div>
            </div>
          </UFormGroup>
        </div>

        <template #footer>
          <section class="flex justify-between">
            <UButton
              variant="ghost"
              color="gray"
              type="button"
              @click="onCancel"
            >
              Batalkan
            </UButton>
            <UButton type="submit"> Simpan </UButton>
          </section>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<script setup lang="ts">
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'

  const MAX_TITLE_LENGTH = 50
  const MAX_DESCRIPTION_LENGTH = 100

  const pageStore = usePageStore()

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    sectionIndex: {
      type: Number,
      default: null,
    },
    widgetIndex: {
      type: Number,
      default: null,
    },
  })

  const form = reactive({
    title: '',
    description: '',
    isActive: false,
  })

  const formSchema = z.object({
    title: z
      .string()
      .min(3, 'Judul tidak boleh kurang dari 3 karakter')
      .max(50, 'Judul tidak boleh lebih dari 50 karakter'),
    description: z
      .string()
      .max(100, 'Deskripsi tidak boleh lebih dari 100 karakter')
      .optional(),
    isActive: z.boolean().optional(),
  })

  type Schema = z.output<typeof formSchema>

  const titleLengthRemaining = computed(() => {
    return MAX_TITLE_LENGTH - form.title.length
  })

  const descriptionLengthRemaining = computed(() => {
    return MAX_DESCRIPTION_LENGTH - form.description.length
  })

  function onSave(event: FormSubmitEvent<Schema>) {
    const { title, description, isActive } = event.data

    pageStore.setWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
      payload: {
        title,
        description,
        is_active: isActive ? 1 : 0,
      },
    })

    emit('close')
  }

  /**
   * Sync form data with `pageStore` data if `batalkan` button clicked.
   * This is to avoid unmatch data between local state and pageStore state.
   */
  function onCancel() {
    const { sectionIndex, widgetIndex } = props
    const { payload } =
      pageStore.builderConfig.sections[sectionIndex].widgets[widgetIndex]

    if (payload) {
      form.title = payload.title.toString()
      form.description = payload.description.toString()
      form.isActive = payload.is_active === 1
    }

    emit('close')
  }

  const emit = defineEmits(['close'])
</script>

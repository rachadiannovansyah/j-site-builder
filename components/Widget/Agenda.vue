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
              data-cy="j-site-widget-agenda__header"
            >
              Pengaturan Agenda
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              data-cy="j-site-widget-agenda__button-close"
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
              data-cy="j-site-widget-agenda__form-input-title"
            />
            <template #help>
              <span class="font-lato text-xs text-gray-600">
                Tersisa {{ titleLengthRemaining }} karakter
              </span>
            </template>
            <template #error="{ error }">
              <span
                class="dark:text-red-400' text-red-600"
                data-cy="j-site-widget-agenda__form-error-message-title"
              >
                {{ error }}
              </span>
            </template>
          </UFormGroup>

          <UFormGroup label="Deskripsi (Opsional)" name="description">
            <UTextarea
              v-model="form.description"
              placeholder="Masukkan deskripsi"
              :rows="5"
              maxlength="100"
              data-cy="j-site-widget-agenda__form-input-description"
            />
            <template #help>
              <span class="font-lato text-xs text-gray-600">
                Tersisa {{ descriptionLengthRemaining }} karakter
              </span>
            </template>
          </UFormGroup>

          <UFormGroup
            label="Aktifkan Agenda"
            data-cy="j-site-widget-agenda__form-action-activation"
          >
            <div class="flex items-center justify-between">
              <span
                class="font-lato text-sm text-gray-600"
                data-cy="j-site-widget-agenda__form-action-activation-description"
              >
                Data Agenda akan diambil dari agenda portal jabar yang sudah
                disesuaikan dengan OPD
              </span>
              <div class="ml-4">
                <UToggle
                  v-model="form.isActive"
                  class="flex-shrink-0"
                  data-cy="j-site-widget-agenda__form-action-activation-toggle"
                />
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
              data-cy="j-site-widget-agenda__button-cancel"
              @click="$emit('close')"
            >
              Batalkan
            </UButton>
            <UButton
              type="submit"
              data-cy="j-site-widget-agenda__button-submit"
            >
              Simpan
            </UButton>
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

  const emit = defineEmits(['close'])

  const pageStore = usePageStore()

  onMounted(() => {
    if (pageStore.isEdit) {
      return setStateFromStore()
    }
    setInitialPayload()
  })

  /* ----------------------- Validation and Submit Form ----------------------- */

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

  function onSave(event: FormSubmitEvent<Schema>) {
    const { title, description, isActive } = event.data

    pageStore.setWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
      payload: {
        title,
        description,
        is_active: isActive,
      },
    })

    emit('close')
  }

  const titleLengthRemaining = computed(() => {
    return MAX_TITLE_LENGTH - form.title.length
  })

  const descriptionLengthRemaining = computed(() => {
    return MAX_DESCRIPTION_LENGTH - form.description.length
  })

  /* ------------------------------- Sync State ------------------------------- */

  function setInitialPayload() {
    pageStore.setWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
      payload: {
        title: form.title,
        description: form.description,
        is_active: form.isActive,
      },
    })
  }

  const currentStorePayload = computed(() => {
    return pageStore.getWidgetPayload({
      sectionIndex: props.sectionIndex,
      widgetIndex: props.widgetIndex,
    })
  })

  function setStateFromStore() {
    form.title = currentStorePayload.value?.title.toString() ?? ''
    form.description = currentStorePayload.value?.description.toString() ?? ''
    form.isActive = !!currentStorePayload.value?.is_active
  }

  /**
   * sync local state with page store when modal is closed
   */
  watch(
    () => props.open,
    function (open) {
      if (!open) {
        // wait for modal transition to finish
        setTimeout(() => {
          setStateFromStore()
        }, 300)
      }
    },
  )
</script>

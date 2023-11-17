<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[982px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-4 sm:px-6',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          background: 'bg-gray-50',
          padding: 'sm:py-4 sm:px-6',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Pilih Templat Halaman
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

      <section class="flex flex-col gap-[5px]">
        <RadioGroup
          v-model="selected"
          class="flex h-full w-full flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 lg:grid-cols-3"
        >
          <RadioGroupOption
            v-for="(template, index) in templates.list"
            :key="index"
            v-slot="{ checked }"
            as="template"
            :value="template.id"
          >
            <div class="relative flex h-[246px] w-[300px] flex-col gap-4">
              <div
                :class="[checked ? 'cursor-pointer ring-2 ring-green-700' : '']"
                class="flex h-[189px] w-[300px] items-end justify-center rounded-[9px] border border-[#F0EFF1] bg-[#F3F5F6] hover:bg-green-50"
              >
                <div
                  class="h-[145px] w-[185px] overflow-hidden rounded-t-md bg-[#F1F1F1]"
                >
                  <img
                    :src="template.thumbnail"
                    :alt="template.name"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
              <NuxtLink
                :to="template.preview"
                target="_blank"
                class="absolute right-2 top-2 rounded-md border border-gray-500"
              >
                <NuxtIcon
                  name="common/eye"
                  aria-hidden="true"
                  class="text-[20px] text-gray-500"
                />
              </NuxtLink>
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <RadioGroupLabel
                    as="p"
                    class="font-lato text-sm font-bold capitalize text-gray-800"
                  >
                    {{ template.name }}
                  </RadioGroupLabel>
                  <RadioGroupDescription
                    as="span"
                    class="font-lato text-[11px] text-gray-700"
                  >
                    {{ countWidget(template.sections) }}
                    konten tersedia di templat ini
                  </RadioGroupDescription>
                </div>
                <div class="flex h-fit items-center">
                  <UButton
                    size="sm"
                    :variant="checked ? 'solid' : 'outline'"
                    :color="checked ? 'primary' : 'gray'"
                    :ui="{ font: 'font-normal' }"
                  >
                    <template v-if="checked" #leading>
                      <NuxtIcon
                        name="common/check-circle"
                        class="text-base"
                        filled
                        aria-hidden="true"
                      />
                    </template>
                    {{ checked ? 'Terpilih' : 'Pilih' }}
                  </UButton>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </RadioGroup>
      </section>

      <template #footer>
        <section class="flex justify-end gap-x-4">
          <UButton variant="outline" @click="$emit('back')"> Kembali </UButton>
          <UButton :disabled="!selected" @click="$emit('next')">
            Mulai Buat Halaman
          </UButton>
        </section>
      </template>
    </UCard>

    <UCard v-if="error">
      <ModalTitle class="flex justify-between"> Mohon Maaf! </ModalTitle>
      <ModalBody>
        <p>Terjadi Kesalahan</p>
      </ModalBody>
      <ModalFooter position="center">
        <BaseButton variant="secondary" @click="$emit('close')">
          Tutup
        </BaseButton>
      </ModalFooter>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription,
  } from '@headlessui/vue'

  import {
    IMetaData,
    ITemplateData,
    ITemplateSection,
    ITemplateWidget,
  } from '~/repository/j-site/types/template'

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  const templates = reactive({
    list: null as null | ITemplateData[],
    meta: null as null | IMetaData,
  })

  const { $jSiteApi } = useNuxtApp()
  const { data: templatesList, error } = await $jSiteApi.templates.getTemplates(
    { server: false },
  )

  templates.list = toRaw(templatesList.value?.data) ?? null
  templates.meta = toRaw(templatesList.value?.meta) ?? null

  const countWidget = (item: ITemplateSection[]) => {
    return item.reduce(
      (count: number, current: { widgets: string | ITemplateWidget[] }) =>
        count + current.widgets.length,
      0,
    )
  }

  const pageStore = usePageStore()
  const selected = computed({
    get() {
      return pageStore.builderConfig.templateId
    },
    set(value) {
      pageStore.setPageTemplate(value)
    },
  })

  defineEmits(['close', 'back', 'next'])
</script>

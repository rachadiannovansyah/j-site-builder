<template>
  <section class="flex flex-col rounded-lg bg-white px-6 py-5">
    <div
      class="flex items-center justify-between pb-4 font-lato text-xs font-medium"
    >
      <div class="flex items-center justify-center gap-2.5">
        <UButton
          v-if="hasTitle"
          size="xs"
          color="blue"
          :data-cy="`j-site-page-builder__button-input-section-${props.sectionIndex}`"
          @click="isInputModalOpen = true"
        >
          <template #leading>
            <NuxtIcon name="common/icon-input-text" aria-hidden="true" />
          </template>
          Input Judul
        </UButton>
        <div
          v-else
          class="flex flex-row gap-[2px] rounded-[6px] bg-blue-50 px-2.5 py-1"
        >
          <span
            class="line-clamp-1 max-w-[150px] self-center font-lato text-[12px] font-medium leading-[23px] text-gray-900"
            :data-cy="`j-site-page-builder__title-section-${
              sectionTitle
                ? sectionTitle.toLowerCase().replaceAll(' ', '-')
                : props.sectionIndex
            }`"
          >
            {{ sectionTitle }}
          </span>
          <UButton
            size="xs"
            color="blue"
            :data-cy="`j-site-page-builder__button-edit-section-${sectionTitle}`"
            @click="isInputModalOpen = true"
          >
            <template #leading>
              <NuxtIcon name="common/icon-input-text" aria-hidden="true" />
            </template>
            Edit Judul
          </UButton>
        </div>
      </div>
      <div class="flex items-center justify-center gap-2.5">
        <UButton
          size="xs"
          color="white"
          :data-cy="`j-site-page-builder__button-clear-section-${props.sectionIndex}`"
        >
          <template #leading>
            <NuxtIcon
              name="common/broom"
              aria-hidden="true"
              class="text-base text-blue-700"
            />
          </template>
          Kosongkan
        </UButton>
        <UButton
          size="xs"
          color="white"
          :data-cy="`j-site-page-builder__button-delete-section-${props.sectionIndex}`"
        >
          <template #leading>
            <NuxtIcon
              name="common/trash"
              aria-hidden="true"
              class="text-sm text-red-700"
            />
          </template>
          Hapus
        </UButton>
      </div>
    </div>
    <div
      :class="{
        'grid w-full gap-2.5': true,
        'grid-cols-1': props.section.grid_column === 1,
        'grid-cols-3': props.section.grid_column === 3,
      }"
    >
      <div
        v-for="(widget, index) in props.section.widgets"
        :key="index"
        :class="{
          'custom-border-dash grid h-[322px] w-full place-content-center rounded-lg bg-[#F9FAFE]': true,
          'col-span-1': widget.grid_span === 1,
          'col-span-2': widget.grid_span === 2,
        }"
      >
        <PageBuilderWidgetSelector
          :widget="widget.widget"
          :widget-name="widget.name"
          :widget-index="index"
          :section-index="props.sectionIndex"
        />
      </div>
    </div>
  </section>

  <!-- @todo: Add popup for input Title and Description -->
  <PageModalBuilderInputTitle
    :open="isInputModalOpen"
    :section-index="sectionIndex"
    @close="isInputModalOpen = false"
  />
</template>

<script setup lang="ts">
  import { ITemplateSection } from '~/repository/j-site/types/template'

  const props = defineProps({
    section: {
      type: Object as PropType<ITemplateSection>,
      default: () => ({}),
    },
    sectionIndex: {
      type: Number,
      default: null,
    },
  })

  const isInputModalOpen = ref(false)
  const pageStore = usePageStore()

  const sectionTitle = computed(() => {
    return pageStore.builderConfig.sections[props.sectionIndex]?.title
  })

  const hasTitle = computed(() => {
    const title = pageStore.builderConfig.sections[props.sectionIndex]?.title
    return !(title !== null && title !== undefined && title.length > 0)
  })
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
</style>

<template>
  <section class="flex flex-col rounded-lg bg-white px-6 py-5">
    <div
      class="flex items-center justify-between pb-4 font-lato text-xs font-medium"
    >
      <div class="flex items-center justify-center gap-2.5">
        <UButton size="xs" color="blue" @click="isInputModalOpen = true">
          <template #leading>
            <NuxtIcon name="common/icon-input-text" aria-hidden="true" />
          </template>
          Input Judul
        </UButton>
      </div>
      <div class="flex items-center justify-center gap-2.5">
        <UButton size="xs" color="white">
          <template #leading>
            <NuxtIcon
              name="common/broom"
              aria-hidden="true"
              class="text-base text-blue-700"
            />
          </template>
          Kosongkan
        </UButton>
        <UButton size="xs" color="white">
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
  <PageModalBuilderInputTitle :open="isInputModalOpen" @close="isInputModalOpen = false" />

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
</script>

<style scoped>
  .custom-border-dash {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='silver' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 8px;
  }
</style>

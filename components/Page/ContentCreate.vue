<template>
  <main class="grid h-full w-full gap-4 px-4">
    <div
      v-for="(section, index) in sections"
      :key="index"
      :class="{
        'grid h-fit w-full gap-x-2 gap-y-4 text-gray-800': true,
        'grid-cols-1': section.grid_column === 1,
        'grid-cols-3': section.grid_column === 3,
      }"
    >
      <div
        v-for="(widget, idx) in section.widgets"
        :key="idx"
        :class="{
          'w-full': true,
          'col-span-1': widget.grid_span === 1,
          'col-span-2': widget.grid_span === 2,
        }"
      >
        <div
          class="min-h-[322px] rounded-lg border-2 border-dashed border-gray-400 bg-gray-50"
        >
          {{ widget }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  // import { IPageSection } from '~/types/stores/page'
  defineProps({
    data: {
      type: Array,
      default: () => [],
    },
  })

  const sections = [
    {
      grid_column: 1,
      widgets: [
        {
          name: 'Slideshow',
          grid_span: 1,
        },
      ],
    },
    {
      grid_column: 1,
      widgets: [
        {
          name: 'Showcase',
          grid_span: 1,
        },
      ],
    },
    {
      grid_column: 3,
      widgets: [
        {
          name: 'Agenda',
          grid_span: 1,
        },
        {
          name: 'PostCrawler',
          grid_span: 2,
        },
      ],
    },
    {
      grid_column: 1,
      widgets: [
        {
          name: 'PinnedPost',
          grid_span: 1,
        },
      ],
    },
    {
      grid_column: 1,
      widgets: [
        {
          name: 'Gallery',
          grid_span: 1,
        },
      ],
    },
  ]
</script>

<template>
  <TabGroup>
    <TabList class="mb-[14px] flex w-full gap-8 rounded-lg bg-white px-4">
      <Tab
        v-for="(tab, index) in tabs"
        :key="index"
        as="template"
        class="min-h-[48px]"
      >
        <NuxtLink :to="tab.link">
          <button
            :class="[
              'h-full w-fit px-3 text-sm font-medium leading-5 text-green-700 focus:outline-none',
              route.path === tab.link
                ? 'border-b-[3px] border-green-700'
                : 'text-gray-700',
            ]"
          >
            {{ tab.label }}
          </button>
        </NuxtLink>
      </Tab>
    </TabList>
  </TabGroup>
</template>

<script setup lang="ts">
  import { TabGroup, TabList, Tab } from '@headlessui/vue'

  const route = useRoute()

  interface ITab {
    label: string
    link: string
  }

  defineProps({
    tabs: {
      type: Array as PropType<ITab[]>,
      default: () => [],
    },
  })
</script>

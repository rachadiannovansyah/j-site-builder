<template>
  <main class="grid h-full w-full px-4">
    <div v-for="(section, index) in data" :key="index">
      <div class="my-1.5 flex h-[17px] w-full items-center">
        <span class="h-[1px] flex-1 bg-[#DEDEDE]" />
        <p
          v-if="index < 2"
          class="flex-none px-1 font-inter text-xs font-medium text-[#989898]"
        >
          {{ index === 0 ? 'Hero Section' : 'Konten Section' }}
        </p>
        <span class="h-[1px] flex-1 bg-[#DEDEDE]" />
      </div>
      <div class="flex h-[412px] flex-col rounded-lg bg-white px-6 py-5">
        <div
          class="flex items-center justify-between pb-4 font-lato text-xs font-medium"
        >
          <div class="flex items-center justify-center gap-2.5">
            <button
              class="flex items-center justify-center gap-1.5 rounded-md bg-[#0F6CC8] px-2.5 py-1.5 text-white"
            >
              <NuxtIcon name="common/icon-input-text" aria-hidden="true" />
              <p>Input Judul</p>
            </button>
            <Menu v-if="index !== 0" as="div" class="relative w-fit">
              <MenuButton
                class="relative flex items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5"
              >
                <NuxtIcon
                  name="common/block"
                  aria-hidden="true"
                  class="text-green-700"
                />
                <p class="text-gray-900">Ganti Kolom</p>
                <NuxtIcon name="common/chevron-down" aria-hidden="true" />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="absolute">
                  <div
                    class="rounded-lg border border-gray-300 bg-white px-3 py-3.5 shadow-lg"
                  >
                    <h1
                      class="pb-2 font-inter text-base font-semibold text-gray-800"
                    >
                      Layout
                    </h1>
                    <ul class="flex gap-4">
                      <MenuItem
                        v-for="(option, idx) in menuOptionLayout"
                        :key="idx"
                        as="li"
                        class="flex cursor-pointer flex-col gap-3"
                      >
                        <div class="h-12 w-[60px]">
                          <img
                            :src="option.img"
                            :alt="option.desc"
                            class="object-cover"
                          />
                        </div>
                        <p
                          class="text-center font-inter text-xs font-medium text-gray-800"
                        >
                          {{ option.name }}
                        </p>
                      </MenuItem>
                    </ul>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="flex items-center justify-center gap-2.5">
            <button
              class="flex items-center justify-center gap-1.5 rounded-md border border-gray-400 bg-white px-2.5 py-1.5 text-gray-900"
            >
              <NuxtIcon
                name="common/broom"
                aria-hidden="true"
                class="text-base text-blue-700"
              />
              <p>Kosongkan</p>
            </button>
            <button
              class="flex items-center justify-center gap-1.5 rounded-md border border-gray-400 bg-white px-2.5 py-1.5 text-gray-900"
            >
              <NuxtIcon
                name="common/trash"
                aria-hidden="true"
                class="text-sm text-red-700"
              />
              <p>Hapus</p>
            </button>
          </div>
        </div>
        <div
          :class="{
            'grid w-full gap-2 text-gray-800': true,
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
              class="flex min-h-[322px] items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-[#F9FAFE]"
            >
              {{ widget.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="data.length < 8"
      class="mb-6 mt-4 flex h-[17px] w-full items-center"
    >
      <span class="h-[1px] flex-1 border-t border-dashed border-blue-600" />
      <button
        class="mx-2 flex items-center justify-center gap-2 rounded-md border border-blue-600 px-2 py-1 text-blue-600"
      >
        <NuxtIcon
          name="common/plus-circle"
          class="-mb-0.5 text-sm"
          aria-hidden="true"
        />
        <p class="font-lato text-xs font-medium">Tambah Section</p>
      </button>
      <span class="h-[1px] flex-1 border-t border-dashed border-blue-600" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { IPageSection } from '~/types/stores/page'

  defineProps({
    data: {
      type: Array as PropType<IPageSection[]>,
      default: () => [],
      required: true,
    },
  })

  const menuOptionLayout = [
    {
      name: 'Full Width',
      desc: 'Ilustrasi opsi halaman full width.',
      img: '/images/layout/full-width.svg',
    },
    {
      name: '1/2',
      desc: 'Ilustrasi opsi halaman 1/2.',
      img: '/images/layout/half.svg',
    },
    {
      name: '1/3',
      desc: 'Ilustrasi opsi halaman 1/3.',
      img: '/images/layout/one-third.svg',
    },
    {
      name: '2/3',
      desc: 'Ilustrasi opsi halaman 2/3.',
      img: '/images/layout/two-third.svg',
    },
  ]
</script>

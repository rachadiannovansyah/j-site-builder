<template>
  <li
    v-for="item in props.data"
    :key="item.id"
    class="flex items-center gap-[10px]"
  >
    <span class="font-medium text-blue-gray-900">
      {{ item.index }}
    </span>
    <div
      class="flex h-[52px] w-full items-center justify-between rounded-xl border border-gray-300 px-4"
    >
      <div class="flex items-center justify-center gap-4">
        <p
          class="max-w-[500px] truncate text-sm font-medium text-blue-gray-800"
        >
          {{ item.title }}
        </p>
        <span class="rounded-lg bg-gray-100 px-3 py-0.5 text-xs text-gray-600">
          {{ formatDate(item.updated_at) }}
        </span>
        <span
          v-if="item.status"
          class="flex items-center justify-center bg-white text-xs"
        >
          <div
            v-if="item.status === statusPage[0].status"
            class="flex gap-1 rounded-lg border border-blue-800 px-3 py-0.5 text-blue-800"
          >
            <NuxtIcon
              :name="statusPage[0].icon"
              class="text-base"
              aria-hidden="true"
            />
            <p>{{ statusPage[0].label }}</p>
          </div>
          <div
            v-else-if="item.status === statusPage[1].status"
            class="flex gap-1 rounded-lg border border-green-800 px-3 py-0.5 text-green-800"
          >
            <NuxtIcon
              :name="statusPage[1].icon"
              class="text-base"
              aria-hidden="true"
              filled
            />
            <p>{{ statusPage[1].label }}</p>
          </div>
          <div
            v-else
            class="flex gap-1 rounded-lg border border-purple-800 px-3 py-0.5 text-purple-800"
          >
            <NuxtIcon
              :name="statusPage[2].icon"
              class="text-base"
              aria-hidden="true"
            />
            <p>{{ statusPage[2].label }}</p>
          </div>
        </span>
      </div>
      <PopupItemAction>
        <ul
          class="flex w-[130px] flex-col gap-3 p-4 font-lato text-sm font-medium text-gray-700"
        >
          <li>
            <button>Pratinjau</button>
          </li>
          <li v-if="item.status !== statusPage[2].status">
            <NuxtLink :to="`/halaman/ubah/${item.id}`"> Ubah </NuxtLink>
          </li>
          <li v-if="item.status === statusPage[0].status">
            <button @click="onArchivePage(item.id)">Arsipkan</button>
          </li>
          <li v-if="item.status === statusPage[1].status">
            <button class="text-red-400" @click="onDeletePage(item.id)">
              Hapus
            </button>
          </li>
        </ul>
      </PopupItemAction>
    </div>
  </li>
</template>

<script setup lang="ts">
  import { format } from 'date-fns'
  import ID from 'date-fns/locale/id'

  const props = defineProps({
    loading: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  })

  const statusPage = [
    {
      status: 'PUBLISHED',
      label: 'Terbit',
      icon: 'common/plane',
    },
    {
      status: 'DRAFT',
      label: 'Draft',
      icon: 'common/draft',
    },
    {
      status: 'ARCHIVED',
      label: 'Diarsipkan',
      icon: 'common/archived',
    },
  ]

  function formatDate(date: string) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ID })
  }

  const emit = defineEmits(['archive', 'delete'])

  function onArchivePage(id: string) {
    emit('archive', id)
  }

  function onDeletePage(id: string) {
    emit('delete', id)
  }
</script>

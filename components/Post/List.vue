<template>
  <li
    v-for="(item, index) in props.data"
    :key="index"
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
          {{ item.title || '-' }}
        </p>
        <span
          class="max-w-[120px] truncate rounded-lg bg-gray-50 px-3 py-0.5 text-xs font-semibold text-gray-600"
        >
          {{ item.category?.name || '-' }}
        </span>
        <span class="rounded-lg bg-gray-100 px-3 py-0.5 text-xs text-gray-600">
          {{ item.updated_at ? formatDate(item.updated_at) : '-' }}
        </span>
        <span
          v-if="item.status"
          class="flex items-center justify-center bg-white text-xs"
        >
          <div
            v-if="item.status === statusPost[0].status"
            class="flex gap-1 rounded-lg border border-blue-800 px-3 py-0.5 text-blue-800"
          >
            <NuxtIcon
              :name="statusPost[0].icon"
              class="text-base"
              aria-hidden="true"
            />
            <p>{{ statusPost[0].label || '-' }}</p>
          </div>
          <div
            v-else-if="item.status === statusPost[1].status"
            class="flex gap-1 rounded-lg border border-green-800 px-3 py-0.5 text-green-800"
          >
            <NuxtIcon
              :name="statusPost[1].icon"
              class="text-base"
              aria-hidden="true"
              filled
            />
            <p>{{ statusPost[1].label || '-' }}</p>
          </div>
          <div
            v-else
            class="flex gap-1 rounded-lg border border-purple-800 px-3 py-0.5 text-purple-800"
          >
            <NuxtIcon
              :name="statusPost[2].icon"
              class="text-base"
              aria-hidden="true"
            />
            <p>{{ statusPost[2].label || '-' }}</p>
          </div>
        </span>
      </div>
      <PopupItemAction v-if="item.status !== statusPost[2].status">
        <ul
          class="flex w-[130px] flex-col gap-3 p-4 font-lato text-sm font-medium text-gray-700"
        >
          <li>
            <NuxtLink :to="`/posting/ubah/${item.id}`"> Ubah </NuxtLink>
          </li>
          <li v-if="item.status === statusPost[0].status">
            <button @click="onArchivePost(item.id)">Arsipkan</button>
          </li>
          <li v-if="item.status === statusPost[1].status">
            <button class="text-red-400" @click="onDeletePost(item.id)">
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

  const statusPost = [
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

  const emit = defineEmits(['archive', 'delete'])

  function onArchivePost(id: string) {
    emit('archive', id)
  }

  function onDeletePost(id: string) {
    emit('delete', id)
  }

  function formatDate(date: string) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ID })
  }
</script>

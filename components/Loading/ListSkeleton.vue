<template>
  <ul role="list" class="flex flex-col gap-3">
    <li v-for="item in 5" :key="item" class="flex items-center gap-[10px]">
      <span class="h-11 w-8 rounded-lg bg-gray-200"> </span>
      <div
        class="h-11 w-full animate-pulse rounded-lg border bg-gray-200"
      ></div>
    </li>
  </ul>
</template>

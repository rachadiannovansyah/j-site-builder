<template>
  <ul role="list" class="flex flex-col gap-[30px] px-6">
    <li v-for="item in 6" :key="item" class="flex items-center gap-[30px]">
      <span class="h-8 w-8 animate-pulse rounded-md bg-gray-100"> </span>
      <div class="h-8 w-full animate-pulse rounded-xl bg-gray-100"></div>
    </li>
  </ul>
</template>

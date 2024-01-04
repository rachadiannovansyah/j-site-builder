<template>
  <section
    class="flex h-full w-full flex-col items-center justify-center gap-[10px] p-[10px]"
  >
    <img
      src="@/assets/images/no-data.svg"
      alt="ilustrasi tampilan data kosong"
      width="160"
      height="160"
      class="max-w-full object-cover object-center"
      data-cy="j-site-no-data__image"
    />
    <h1
      class="text-center font-inter text-base font-semibold leading-[26px] text-gray-900"
      data-cy="j-site-no-data__title"
    >
      {{ title }}
    </h1>
    <p
      class="text-center font-inter text-[13px] leading-[27px] text-gray-700"
      data-cy="j-site-no-data__description"
    >
      {{ description }}
    </p>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  })
</script>

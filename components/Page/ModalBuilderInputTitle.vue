<template>
  <UModal
    :model-value="props.open"
    prevent-close
    :ui="{ base: 'md:max-w-[750px]' }"
  >
    <UCard
      :ui="{
        body: {
          padding: 'sm:py-4 sm:px-0',
        },
        header: {
          padding: 'sm:py-4 sm:px-6',
        },
        footer: {
          padding: 'sm:py-4 sm:px-6',
        }
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-roboto text-xl font-medium leading-8 text-green-800">
            Isi Judul Section
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>

      <section class="grid grid-cols-1 gap-y-4">
        <img
          src="~/assets/images/illustration-title-input.svg"
          width="548"
          height="345"
          class="justify-self-center"
          alt="Ilustrasi gambar faq"
        />
        <div class="mx-6 px-4 py-[14px] gap-y-[10px]">
          <UFormGroup label="Judul (Opsional)">
            <template #default>
              <UInput
                placeholder="Masukkan judul"
                color="gray"
              />
            </template>
            <template #help>
              Tersisa 250 Karakter
            </template>
          </UFormGroup>
          <UFormGroup label="Deskripsi (Opsional)">
            <template #default>
              <UTextarea
                placeholder="Masukkan deskripsi"
                color="gray"
                :rows="5"
              />
            </template>
            <template #help>
              Tersisa 500 Karakter
            </template>
          </UFormGroup>
        </div>
      </section>

      <template #footer>
        <section class="flex justify-between">
          <UButton variant="ghost" color="gray" @click="$emit('close')">
            Batalkan
          </UButton>
          <div class="flex gap-x-4">
            <UButton color="red" variant="outline">
              <template #leading>
                <NuxtIcon name="common/trash" size="50" aria-hidden="true" />
              </template>
              Hapus
            </UButton>
            <UButton> Submit </UButton>
          </div>
        </section>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['close'])
</script>

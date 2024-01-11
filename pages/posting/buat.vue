<template>
  <PostForm @submit-form="openPublishConfirmation">
    <template #header="{ valid }">
      <nav class="mb-[14px] flex items-center justify-between py-[14px]">
        <UButton variant="outline" @click="goBack">
          <template #leading>
            <NuxtIcon
              name="common/arrow-left"
              aria-hidden="true"
              class="text-xl"
            />
          </template>
          Kembali
        </UButton>

        <div class="flex gap-x-[14px]">
          <UButton
            variant="outline"
            type="button"
            @click="openSaveAsDraftConfirmation"
          >
            <template #leading>
              <NuxtIcon
                name="common/folder"
                aria-hidden="true"
                class="text-xl"
              />
            </template>
            Simpan ke Draft
          </UButton>
          <UButton type="submit" :disabled="!valid">
            <template #leading>
              <NuxtIcon name="common/file" aria-hidden="true" class="text-xl" />
            </template>
            Terbitkan Post
          </UButton>
        </div>
      </nav>
    </template>
  </PostForm>

  <!-- Confirmation Modal for Save as Draft and Publish -->
  <BaseModal
    :open="modal.status === 'SAVE_AS_DRAFT' || modal.status === 'PUBLISH'"
    :header="modal.title"
    button-position="right"
  >
    <p class="text-md mb-4 font-lato leading-6 text-gray-700">
      {{ modal.message }}
    </p>
    <template #footer>
      <UButton variant="outline" type="button" @click="closeModal">
        Batal
      </UButton>
      <UButton v-show="modal.status === 'SAVE_AS_DRAFT'" type="button">
        Ya, simpan ke draf
      </UButton>
      <UButton v-show="modal.status === 'PUBLISH'" type="button">
        Ya, simpan post
      </UButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Posting',
  })

  type IModalState = 'NONE' | 'SAVE_AS_DRAFT' | 'PUBLISH'

  interface IModalConfirmation {
    status: IModalState
    title: string
    message: string
  }

  const modal = reactive<IModalConfirmation>({
    status: 'NONE',
    title: '',
    message: '',
  })

  function goBack() {
    // TODO: handle router go back
  }

  function setModal({ status, title, message }: IModalConfirmation) {
    modal.status = status
    modal.title = title
    modal.message = message
  }

  function openSaveAsDraftConfirmation() {
    setModal({
      status: 'SAVE_AS_DRAFT',
      title: 'Simpan ke Draf',
      message: 'Apakah Anda ingin menyimpan Post ini ke draf?',
    })
  }

  function openPublishConfirmation() {
    setModal({
      status: 'PUBLISH',
      title: 'Simpan Post',
      message: 'Apakah Anda ingin menyimpan Post ini?',
    })
  }

  function closeModal() {
    modal.status = 'NONE'

    setTimeout(() => {
      resetModal()
    }, 300)
  }

  function resetModal() {
    modal.title = ''
    modal.message = ''
  }
</script>

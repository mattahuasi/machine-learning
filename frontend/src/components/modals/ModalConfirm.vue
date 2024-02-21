<script setup>
import { ref } from "vue";
import { VueFinalModal } from "vue-final-modal";

const props = defineProps({
  title: {
    type: String,
    default: "Modal",
  },
});
const emit = defineEmits(
  {
    confirm: () => true,
  },
  {
    close: () => true,
  }
);

// const open = ref(true);
</script>

<template>
  <VueFinalModal
    v-model="show"
    class="flex justify-center items-center"
    content-class="mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-900 rounded-lg space-y-2"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div
      class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <button
        type="button"
        @click="emit('close')"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="defaultModal"
      >
        <v-icon name="fa-times" />
        <span class="sr-only">Close modal</span>
      </button>
    </div>

    <div class="p-6 text-base leading-relaxed">
      <slot />
    </div>
    <div
      class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
    >
      <button
        @click="emit('confirm')"
        data-modal-hide="defaultModal"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Confirmar
      </button>
      <button
        @click="emit('close')"
        data-modal-hide="defaultModal"
        type="button"
        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
      >
        Cancelar
      </button>
    </div>
  </VueFinalModal>

  <!-- <div>
    <h3 class="text-3xl font-medium text-gray-700">Modal</h3>
    <button
      class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
      @click="open = true"
    >
      Open Modal
    </button>

    <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="open = false"
      />

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div> -->

  <!-- Add margin if you want to see some of the overlay behind the modal -->
  <!-- <div class="px-6 py-4 text-left modal-content"> -->
  <!-- Title -->
  <!-- <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">Modal Title</p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div> -->

  <!-- Body -->
  <!-- <p>Modal content.</p> -->

  <!-- Footer -->
  <!-- <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              @click="open = false"
            >
              Close
            </button>
            <button
              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              @click="open = false"
            >
              Action
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>

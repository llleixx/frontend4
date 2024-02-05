<template>
  <div class="relative">
    <input type="text" @keyup.enter="emit('search', searchValue)"
      class="ps-3 h-14 pe-10 w-full border border-gray-300 shadow-md rounded-md sm:text-sm dark:bg-dark-blue dark:border-gray-800 dark:placeholder-slate-300"
      :disabled="!props.ready" :placeholder="props.placeholder" v-model="searchValue" />
    <div class="absolute flex w-10 inset-y-0 end-0 place-content-center">
      <button type="button" @click="emit('search', searchValue)" aria-label="search">
        <svg class="w-4 h-4 stroke-gray-300 fill-gray-300">
          <use xlink:href="#icon-search"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  ready: {
    default: true
  }
})
const emit = defineEmits(['search'])

const searchValue = ref('')

</script>
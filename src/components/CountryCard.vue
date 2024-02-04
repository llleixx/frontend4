<template>
  <div class="border border-gray-300 shadow-lg rounded-lg overflow-hidden w-full dark:bg-dark-blue dark:border-slate-800">
    <picture class="block w-full">
      <source :srcset="props.country.flags.png" />
      <img :srcset="props.country.flags.svg" alt="country flag" class="w-full h-48 object-cover" />
    </picture>
    <div class="ps-6 pb-10">
      <h2 class="py-5 font-bold text-lg">{{ props.country.name }}</h2>
      <p><span class="font-semibold text-sm">Population:</span> {{ props.country.population }}</p>
      <p><span class="font-semibold text-sm">Region:</span> {{ props.country.region }}</p>
      <p><span class="font-semibold text-sm">Capital:</span> {{ props.country.capital }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  country: {
    required: true
  }
})
</script>
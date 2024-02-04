<template>
  <main class="px-3 lg:px-16">
    <div class="lg:flex lg:flex-row lg:justify-between lg:flex-wrap lg:items-center">
      <InputSearch placeholder="Search for a country..." :ready="ready" @search="searchCountry" class="lg:w-1/3">
      </InputSearch>
      <select
        class="rounded-lg sm:text-sm mt-8 h-12 border border-gray-300 shadow-md mb-8 dark:bg-dark-blue dark:border-slate-800"
        :disabled="!ready" v-model="region">
        <option value=''>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
    <template v-if="loading">
      <LoadSpinner class="mx-auto mt-8"></LoadSpinner>
    </template>
    <template v-else-if="ready">
      <div class="w-5/6 grid grid-cols-1 gap-y-8 mx-auto sm:grid-cols-2 lg:grid-cols-4 md:w-full md:gap-x-8">
        <CountryCard v-for="(_, i) in Math.min(filteredCountries.length, nowIndex * 8)" :key="filteredCountries[i].name"
          class="hover:scale-105 transition-all hover:cursor-pointer" :country="filteredCountries[i]"
          @click="router.push({ name: 'country', params: { countryName: filteredCountries[i].name } })">
        </CountryCard>
      </div>
    </template>
    <template v-else>
      <p>{{ error }}</p>
    </template>
  </main>
</template>

<script setup>
import InputSearch from '../components/InputSearch.vue'
import CountryCard from '../components/CountryCard.vue'
import LoadSpinner from '@/components/LoadSpinner.vue';
import { useCountriesStore } from '../stores/countries';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import router from '@/router';

const countriesStore = useCountriesStore()
const region = ref('')
const regionCountries = ref([])
const filteredCountries = ref([])

const loading = ref(true)
const ready = ref(false)
const error = ref(null)
let lastSearch = ''

watch(region, () => {
  if (region.value === '') {
    regionCountries.value = countriesStore.countries
    filteredCountries.value = countriesStore.getCountriesByName(lastSearch, regionCountries.value)
  } else {
    regionCountries.value = countriesStore.getCountriesByRegion(region.value)
    filteredCountries.value = countriesStore.getCountriesByName(lastSearch, regionCountries.value)
  }
})

function searchCountry(searchValue) {
  lastSearch = searchValue
  if (searchValue === '') {
    filteredCountries.value = regionCountries.countries
  }
  else {
    filteredCountries.value = countriesStore.getCountriesByName(searchValue, regionCountries.value)
  }
}

const nowIndex = ref(1)

function checkLoadMore() {
  const buffer = 10;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - buffer) {
    nowIndex.value++
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkLoadMore)
  countriesStore.fetchCountries().catch((err) => {
    error.value = err
    loading.value = false
  }).finally(() => {
    if (!error.value) {
      filteredCountries.value = regionCountries.value = countriesStore.countries
      loading.value = false
      ready.value = true
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkLoadMore)
})

</script>

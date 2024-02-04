<template>
  <main class="px-6 lg:px-16">
    <RouterLink :to="{ name: 'home' }"
      class="inline-flex flex-row items-center px-5 border border-gray-300 rounded-md shadow-md py-1 hover:scale-110 transition-all active:translate-x-1 active:translate-y-1 dark:border-slate-800 dark:bg-dark-blue">
      <svg viewBox="0 0 32 32" class="w-4 h-4 fill-current stroke-current">
        <path
          d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z">
        </path>
      </svg>
      <span class="ms-2">Back</span>
    </RouterLink>
    <template v-if="loading">
      <LoadSpinner class="mx-auto mt-8"></LoadSpinner>
    </template>
    <template v-else-if="ready">
      <div class="flex flex-col mt-12 md:flex-row md:mt-8">
        <picture class="flex place-content-center flex-wrap  md:flex-1 md md:me-24">
          <source :srcset="country.flags.png" />
          <img :srcset="country.flags.svg" alt="country flag" class="w-full h-56 object-cover md:h-96" />
        </picture>
        <div class="md:flex-1">
          <h1 class="font-extrabold py-10 text-xl">
            {{ country.name }}
          </h1>
          <div class="flex flex-col space-y-10 leading-9 md:flex-row md:space-x-24">
            <div>
              <p><span class="font-bold">Naive Name: </span> {{ country.nativeName }}</p>
              <p><span class="font-bold">Population: </span> {{ country.population }}</p>
              <p><span class="font-bold">Region: </span> {{ country.region }}</p>
              <p><span class="font-bold">Sub Region: </span> {{ country.subregion }}</p>
              <p><span class="font-bold">Capital: </span> {{ country.capital }}</p>
            </div>
            <div>
              <p><span class="font-bold">Top Level Domain: </span>
                <span v-for="(domain, i) in country.topLevelDomain">{{ domain }}<template
                    v-if="i !== country.topLevelDomain.length - 1">, </template></span>
              </p>
              <p>
                <span class="font-bold">Top Level Domain: </span>
                <span v-for="(currency, i) in country.currencies">{{ currency.name }}<template
                    v-if="i !== country.currencies.length - 1">, </template></span>
              </p>
              <p>
                <span class="font-bold">Language: </span>
                <span v-for="(language, i) in country.languages">{{ language.name }}<template
                    v-if="i !== country.languages.length - 1">, </template></span>
              </p>
            </div>
          </div>
          <div class="mt-10">
            <p class="font-bold text-lg">Border Countries:</p>
            <div class="flex flex-row flex-wrap mt-4">
              <div v-for="alpha3Code in country.borders"
                class="border shadow-md px-5 py-2 me-4 mb-2 rounded-full hover:cursor-pointer"
                @click="router.push({ name: 'country', params: { countryName: getCountryNameByAlpha3Code(alpha3Code) } })">
                {{
                  getCountryNameByAlpha3Code(alpha3Code)
                }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p>{{ error }}</p>
    </template>
  </main>
</template>

<script setup>
import LoadSpinner from '@/components/LoadSpinner.vue';
import router from '@/router';
import { useCountriesStore } from '@/stores/countries';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
const countriesStore = useCountriesStore()
const loading = ref(true)
const ready = ref(false)
const error = ref(null)
const country = ref(null)

const props = defineProps({
  countryName: {
    required: true
  }
})

function getCountryNameByAlpha3Code(alpha3Code) {
  const { name } = countriesStore.countries.find((country) => {
    return country.alpha3Code === alpha3Code
  })
  return name
}

watch(() => props.countryName, () => {
  init()
})

async function init() {
  loading.value = true
  ready.value = false
  error.value = null
  try {
    await countriesStore.fetchCountries()
    country.value = countriesStore.getCountryByName(props.countryName)
  } catch (err) {
    loading.value = false
    error.value = err
  } finally {
    loading.value = false
    if (!error.value) {
      ready.value = true
    }
  }
}

// This fails because this occurs before updating props.countryName
// onBeforeRouteUpdate((to, from) => {
//   if (to.params.countryName !== from.params.countryName) {
//     init()
//   }
// })

onMounted(init)
</script>

<style scoped></style>
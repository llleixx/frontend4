import { mande } from 'mande'
import { defineStore } from 'pinia'


const countriesAPI = mande('https://r2.lllei.cc/data.json')

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: []
  }),
  actions: {
    async fetchCountries() {
      if (!this.countries.length) {
        return this.countries = await countriesAPI.get()
      } else {
        return this.countries
      }
    },
    getCountriesByName(name, countries = this.countries) {
      const lowerName = name.toLowerCase()
      return countries.filter((country) => {
        return country.name.toLowerCase().includes(lowerName)
      })
    },
    getCountriesByRegion(region, countries = this.countries) {
      return countries.filter((country) => {
        return country.region === region
      })
    },
    getCountryByName(name, countries = this.countries) {
      const lowerName = name.toLowerCase()
      return countries.find((country) => {
        return country.name.toLowerCase() === lowerName
      })
    }
  }
})

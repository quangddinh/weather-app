<script setup lang="ts">
import axios from 'axios'
import { ref, computed, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/mainSore'
import WeatherCard from '@/components/weather/WeatherCard.vue'
import LoadingWeather from '@/components/common/LoadingWeather.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const dataSearchInput = ref<string>('')
const weatherData = ref()
const locationData = ref()
const isShow = ref(false)
const errorMsg = ref('')

const mainStore = useMainStore()
const { isUsedFahrenheit, apiKey } = storeToRefs(mainStore)

const currentWeather = computed(() => weatherData.value?.weather[0])

const onSearch = async () => {
  if (dataSearchInput.value) {
    isShow.value = true
    try {
      await getLocation(dataSearchInput.value)

      if (locationData.value) {
        await getWeather(locationData.value?.lat, locationData.value?.lon)
        errorMsg.value = ''
      } else {
        throw new Error('No city found. Please correct the city name.')
      }
    } catch (error: any) {
      errorMsg.value = error?.message
    }
    isShow.value = false
  } else {
    errorMsg.value = 'This field is required.'
  }
}

const getWeather = async (latitude: string, longitude: string) => {
  const resWeatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey.value}&units=${isUsedFahrenheit.value ? 'imperial' : 'metric'}`
  )

  weatherData.value = resWeatherData.data
}

const getLocation = async (value: string) => {
  const res = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey.value}`
  )

  locationData.value = res.data[0]
}

provide('isShow', isShow)
</script>

<template>
  <section class="container p-4 relative">
    <h1 class="text-3xl mb-4 text-white">What is the weather like…?</h1>
    <div class="flex items-center w-full max-w-md mb-3">
      <div class="relative w-full mr-3">
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
          placeholder="City..."
          v-model="dataSearchInput"
          @keyup.enter="onSearch"
        />
      </div>
      <button
        class="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        @click="onSearch"
      >
        SEARCH
      </button>
    </div>

    <template v-if="weatherData && !!Object.keys(weatherData).length && !errorMsg?.length">
      <WeatherCard
        :data="weatherData"
        :location-data="locationData"
        :current-weather="currentWeather"
        :is-fahrenheit="isUsedFahrenheit"
      />
    </template>

    <template v-if="!!errorMsg?.length">
      <ErrorMessage :error-msg="errorMsg" />
    </template>

    <LoadingWeather />
  </section>
</template>

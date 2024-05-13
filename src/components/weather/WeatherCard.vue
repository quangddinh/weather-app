<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  currentWeather: {
    type: Object,
    default: () => {}
  },
  locationData: {
    type: Object,
    default: () => {}
  },
  isFahrenheit: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section>
    <div
      v-if="currentWeather && !!Object.keys(currentWeather).length"
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl"
    >
      <div>
        <img
          :src="`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`"
          alt="No image"
        />
        <h3 class="text-lg font-bold text-center text-gray-700">
          {{ currentWeather?.main }}
        </h3>
      </div>

      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          v-if="locationData && !!Object.keys(locationData).length"
          class="mb-2 text-2xl sm:text-4xl font-bold tracking-tight text-gray-900"
        >
          {{ locationData.name }}
        </h5>

        <div class="mb-3 font-semibold text-xl text-orange-700">
          {{ data?.main.temp }}&deg;{{ isFahrenheit ? 'F' : 'C' }}
        </div>
        <div class="mb-3 text-sm text-orange-400">Feels like {{ data?.main.feels_like }}&deg;</div>
      </div>
    </div>
  </section>
</template>

<template>
  <div class="mt-8">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/mainSore'
import axios from 'axios'

const myAPIKey = '28c4a865c59cfb70e9d2fb34010ea9fd'

const mainStore = useMainStore()
const { setBrowserLocation, setApiKey } = mainStore
const { apiKey } = storeToRefs(mainStore)

const successCallback = async (position: any) => {
  const res = await axios.get(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${apiKey.value}`
  )

  setBrowserLocation(res?.data[0].country)
}

const errorCallback = (error: any) => {
  console.log(error)
}

onMounted(() => {
  setApiKey(myAPIKey)
})

navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
</script>

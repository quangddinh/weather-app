<script setup lang="ts">
defineProps({
  errorMsg: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
    <span class="font-medium">{{ errorMsg }}</span>
  </div>
</template>

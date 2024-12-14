<template>
  <q-page padding>
    <q-color v-model="hex" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hex = ref()
</script>

<style scoped></style>

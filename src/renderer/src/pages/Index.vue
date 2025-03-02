<template>
  <q-page padding>
    <q-color v-model="hex" format-model="rgb" @change="onColorChange" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hex = ref()

const onColorChange = async (rgb: string) => {
  const valueString = rgb.substring(4, rgb.length - 1)
  console.log(rgb.substring(4, rgb.length - 1))
  await window.api.serialPort.write('0:' + valueString + ';')
}
</script>

<style scoped></style>

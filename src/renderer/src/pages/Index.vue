<template>
  <q-page class="main-page" padding>
    <div class="main-page__content">
      <div class="main-page__mode-settings">
        dfgdfgdfg
        <q-slider
          v-model="brightness"
          :min="0"
          :max="100"
          :step="4"
          snap
          label-always
          color="green"
          thumb-size="25px"
          :label-value="brightness + '%'"
          markers
        />
      </div>
      <q-color
        v-model="hex"
        class="main-page__main-color"
        format-model="rgb"
        @change="onColorChange"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const brightness = ref()
const hex = ref()

const onColorChange = async (rgb: string) => {
  const valueString = rgb.substring(4, rgb.length - 1)
  console.log(rgb.substring(4, rgb.length - 1))
  await window.api.serialPort.write('0:' + valueString + ';')
}
</script>

<style scoped lang="scss">
.main-page {
  &__content {
    display: flex;
    gap: 60px;
  }
  &__mode-settings {
    flex: auto;
  }
  &__main-color {
    width: 300px;
  }
}
</style>

<template>
  <q-page class="main-page" padding>
    <div class="main-page__content">
      <div class="main-page__mode-settings">
        <q-field bg-color="grey-10" standout="bg-grey-10 text-white" label="Brightness" stack-label>
          <template #control>
            <q-slider
              v-model="brightness"
              :min="0"
              :max="100"
              :step="1"
              snap
              label
              color="orange"
              thumb-color="purple"
              thumb-size="25px"
              track-size="10px"
              :label-value="brightness + '%'"
              :markers="10"
            />
          </template>
        </q-field>
      </div>
      <q-color
        v-model="hex"
        class="main-page__main-color"
        format-model="rgb"
        @change="onColorChange"
      />
    </div>

    <q-footer class="bg-dark" bordered>
      <q-toolbar>
        <q-space />
        <q-btn class="q-mr-lg" size="lg">Reset</q-btn>
        <q-btn color="primary" size="lg">Save</q-btn>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const brightness = ref(0)
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

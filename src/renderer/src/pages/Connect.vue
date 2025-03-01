<template>
  <q-page class="window-height window-width row justify-center items-center" padding>
    <div>
      <q-select
        v-model="selectedPort"
        class="port-select"
        outlined
        :options="ports"
        option-label="friendlyName"
        label="COM Port"
      >
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey"> No available ports </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="q-mt-md flex justify-end q-gutter-sm">
        <q-btn color="secondary" label="Auto Connect" @click="send" />
        <q-btn color="primary" label="Connect" @click="connect" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { PortInfo } from '@serialport/bindings-interface'

const selectedPort = ref<PortInfo>()
const ports = ref<PortInfo[]>([])
let watchTimer: number | undefined = undefined

const connect = async () => {
  console.log(selectedPort.value?.path)

  const port = await window.api.serialPort.connect({ path: selectedPort.value?.path })
  console.log(port)

  window.api.serialPort.subscribe((_e, data) => {
    console.log('RECEVID: ', data)
  })
}

const send = async () => {
  await window.api.serialPort.write('0:#fffccc;')
}

onMounted(() => {
  watchTimer = window.setInterval(async () => {
    ports.value = (await window.api.serialPort.list()).filter((port) => port.productId)
  }, 1000)
})
onUnmounted(() => {
  clearTimeout(watchTimer)
})
</script>

<style scoped lang="scss">
.port-select {
  min-width: 350px;
}
</style>

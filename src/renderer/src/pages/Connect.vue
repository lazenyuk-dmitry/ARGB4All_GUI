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
        <!-- <q-btn color="secondary" label="Auto Connect" /> -->
        <q-btn color="primary" label="Connect" @click="onConnect" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { PortInfo } from '@serialport/bindings-interface'
import { useConnectionStore } from '@renderer/store/connection'
import { useRouter } from 'vue-router'

const selectedPort = ref<PortInfo>()
const ports = ref<PortInfo[]>([])
let watchTimer: number | undefined = undefined

const { connect, availableList } = useConnectionStore()
const router = useRouter()

const onConnect = async () => {
  const path = selectedPort.value?.path
  if (path) {
    await connect(path)
    router.push('/')
  }
}

onMounted(async () => {
  ports.value = await availableList()
  watchTimer = window.setInterval(async () => {
    ports.value = await availableList()
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

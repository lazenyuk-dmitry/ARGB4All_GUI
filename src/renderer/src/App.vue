<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useGlobalStore } from './store/global'

const globalStore = useGlobalStore()

window.api.serialPort.on('data', (_e, data) => {
  globalStore.update(data)
})
</script>

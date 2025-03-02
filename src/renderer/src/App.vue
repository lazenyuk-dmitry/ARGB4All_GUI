<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
window.api.serialPort.on('data', (_e, data) => {
  console.log('RECEVID: ', data)
})
</script>

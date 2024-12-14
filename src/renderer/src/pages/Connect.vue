<template>
  <q-page padding @click="lets">Connect</q-page>
</template>

<script setup lang="ts">

const lets = async () => {
  console.log(await window.api.serialPort.list())
}
</script>

<style scoped></style>

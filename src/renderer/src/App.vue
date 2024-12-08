<script setup lang="ts">
import { ref } from 'vue'

const hex = ref()
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-color v-model="hex" class="my-picker" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

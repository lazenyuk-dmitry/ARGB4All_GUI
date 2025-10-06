<template>
  <q-page class="main-page" padding>
    <div class="main-page__content">
      <div class="main-page__mode-settings">
        <q-field bg-color="grey-10" standout="bg-grey-10 text-white" label="Brightness" stack-label>
          <template #control>
            <q-slider
              v-model="state.brightness"
              :min="1"
              :max="100"
              :step="1"
              snap
              label
              color="orange"
              thumb-color="purple"
              thumb-size="25px"
              track-size="10px"
              :label-value="state.brightness + '%'"
              :markers="10"
            />
          </template>
        </q-field>
      </div>
      <q-color v-model="state.color" class="main-page__main-color" format-model="rgb" />
    </div>

    <q-footer class="bg-dark" bordered>
      <q-toolbar>
        <q-btn class="q-mr-lg" size="lg" @click="globalStore.resetHard()">Reset</q-btn>
        <q-space />
        <q-btn class="q-mr-lg" size="lg" @click="globalStore.reset()" :disable="!hasChanges"
          >Cancel</q-btn
        >
        <q-btn color="primary" size="lg" @click="globalStore.save()" :disable="!hasChanges"
          >Save</q-btn
        >
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@renderer/store/global'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { state, hasChanges } = storeToRefs(globalStore)
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

import { parseComData } from '@renderer/utils/parser'
import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { SerialWrite } from '../types/serial'
import { serialPortWrite } from '@renderer/api'

interface GlobalState {
  color: null | string
  brightness: null | number
}

const INIT_DATA: GlobalState = {
  color: null,
  brightness: null
}

export const useGlobalStore = defineStore('global-store', () => {
  const DEFAULTS = reactive<GlobalState>(JSON.parse(JSON.stringify(INIT_DATA)))
  const state = reactive<GlobalState>(JSON.parse(JSON.stringify(INIT_DATA)))

  watch(
    () => state.color,
    (rgb) => {
      if (rgb) {
        const valueString = rgb.substring(4, rgb.length - 1)
        serialPortWrite(SerialWrite.Color, valueString)
      }
    }
  )

  watch(
    () => state.brightness,
    (value) => {
      if (value !== null) {
        serialPortWrite(SerialWrite.Brightness, value)
      }
    }
  )

  const hasChanges = computed(() => {
    let changed = false;
    for (const key of Object.keys(state)) {
      if (state[key] !== DEFAULTS[key]) {
        changed = true;
        break;
      }
    }
    return changed;
  })

  const updateDefaults = () => {
    for (const key of Object.keys(state)) {
      DEFAULTS[key] = JSON.parse(JSON.stringify(state[key]));
    }
  }

  const update = (data: string) => {
    const { key, value } = parseComData(data)

    switch (key as SerialWrite) {
      case SerialWrite.Color:
        state.color = `rgb(${value})`
        break
      case SerialWrite.Brightness:
        state.brightness = parseInt(value)
        break
      default:
        break
    }

    updateDefaults();
  }

  const save = () => {
    serialPortWrite(SerialWrite.Save);
    updateDefaults();
  }

  const reset = () => {
    for (const key of Object.keys(state)) {
      state[key] = DEFAULTS[key];
    }
  }

  const resetHard = () => {
    serialPortWrite(SerialWrite.Reset);
  }

  return {
    state,
    hasChanges,
    update,
    save,
    reset,
    resetHard,
  }
})

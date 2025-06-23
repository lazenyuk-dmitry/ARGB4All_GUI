import { parseComData } from '@renderer/utils/parser'
import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { SerialWrite } from '../types/serial'
import { serialPortWrite } from '@renderer/api'

interface GlobalState {
  color: null | string
  brightness: null | number
}

export const useGlobalStore = defineStore('global-store', () => {
  const state = reactive<GlobalState>({
    color: null,
    brightness: null
  })

  watch(
    () => state.color,
    (rgb) => {
      if (rgb) {
        const valueString = rgb.substring(4, rgb.length - 1)
        serialPortWrite('Color', valueString)
      }
    }
  )

  watch(
    () => state.brightness,
    (value) => {
      if (value !== null) {
        serialPortWrite('Brightness', value)
      }
    }
  )

  const init = (data: string) => {
    const parsedData = parseComData(data)

    parsedData.forEach(({ key, value }) => {
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
    })
  }

  return {
    state,
    init
  }
})

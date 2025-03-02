import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalStore = defineStore('global-store', () => {
  const state = reactive({
    color: ''
  })

  window.api.serialPort.on('data', (_e, data) => {
    console.log('RECEVID: ', data)
  })
})

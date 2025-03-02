import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface ConnectionInfo {
  opening: boolean
  settings: {
    autoOpen: boolean
    endOnClose: boolean
    highWaterMark: number
    baudRate: number
    path: string
  }
}

export const useConnectionStore = defineStore('connection-store', () => {
  const connection = ref<ConnectionInfo | null>(null)

  const router = useRouter()

  window.api.serialPort.on('close', () => {
    connection.value = null
    router.push({ name: 'connect' })
  })

  const connect = async (path: string) => {
    connection.value = await window.api.serialPort.connect({ path })
    return connection
  }

  const availableList = async () => {
    const list = await window.api.serialPort.list()
    return list.filter((port) => port.productId)
  }

  return {
    connection,
    connect,
    availableList
  }
})

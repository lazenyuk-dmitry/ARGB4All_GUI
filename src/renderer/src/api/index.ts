import { SerialWrite } from '@renderer/types/serial'

export const serialPortWrite = async (method: SerialWrite, value?: string | number) => {
  await window.api.serialPort.write(`${method}:${value || ''};`)
}

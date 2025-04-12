import { SerialWrite } from '@renderer/types/serial'

type MethodNames = keyof typeof SerialWrite

export const serialPortWrite = async (method: MethodNames, value: string) => {
  await window.api.serialPort.write(`${SerialWrite[method]}:${value};`)
}

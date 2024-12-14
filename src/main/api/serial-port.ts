import { SerialPort } from 'serialport'
import { ConnectionInfo, SerialPortOpenOptions } from './types/serial-port'
import { AutoDetectTypes } from '@serialport/bindings-cpp'

let connection: SerialPort<AutoDetectTypes> | null = null

export const getPortsList = async () => {
  return await SerialPort.list()
}

export const connect = async (options: SerialPortOpenOptions): Promise<ConnectionInfo> => {
  connection = new SerialPort({
    baudRate: 9600,
    ...options
  })

  return {
    opening: connection.opening,
    settings: {
      autoOpen: connection.settings.autoOpen,
      endOnClose: connection.settings.endOnClose,
      highWaterMark: connection.settings.highWaterMark,
      baudRate: connection.settings.baudRate,
      path: connection.settings.path
    }
  }
}

export const send = (string: JSON) => {
  return connection?.write(string)
}

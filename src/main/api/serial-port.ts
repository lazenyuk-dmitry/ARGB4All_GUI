import { ReadlineParser, SerialPort } from 'serialport'
import { ConnectionInfo, SerialPortOpenOptions } from './types/serial-port'
import { AutoDetectTypes } from '@serialport/bindings-cpp'
import { mainWindow } from '..'

let connection: SerialPort<AutoDetectTypes> | null = null
let parser: ReadlineParser

export const getPortsList = async () => {
  return await SerialPort.list()
}

export const connect = async (options: SerialPortOpenOptions): Promise<ConnectionInfo> => {
  connection = new SerialPort({
    baudRate: 9600,
    ...options
  }).setEncoding('utf8')

  parser = connection.pipe(new ReadlineParser({ delimiter: ';' }))
  parser.on('data', (data) => {
    mainWindow.webContents.postMessage('serialPort:data', data)
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

export const write = async (string: string) => {
  connection?.write(string)
}

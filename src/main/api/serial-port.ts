import { ReadlineParser, SerialPort } from 'serialport'
import { ConnectionInfo, SerialPortOpenOptions } from './types/serial-port'
import { AutoDetectTypes } from '@serialport/bindings-cpp'
import { mainWindow } from '..'

let port: SerialPort<AutoDetectTypes> | null = null
let parser: ReadlineParser

export const getPortsList = async () => {
  return await SerialPort.list()
}

export const connect = async (options: SerialPortOpenOptions): Promise<ConnectionInfo> => {
  port = new SerialPort({
    baudRate: 9600,
    ...options
  }).setEncoding('utf8')

  parser = port.pipe(new ReadlineParser({ delimiter: ';' }))
  parser.on('data', (data) => {
    console.log('COM PORT DATA: ', data)
    mainWindow.webContents.postMessage('serialPort:data', data)
  })

  port.on('open', (data) => {
    mainWindow.webContents.postMessage('serialPort:open', data)
  })

  port.on('close', (data) => {
    mainWindow.webContents.postMessage('serialPort:close', data)
  })

  return {
    opening: port.opening,
    settings: {
      autoOpen: port.settings.autoOpen,
      endOnClose: port.settings.endOnClose,
      highWaterMark: port.settings.highWaterMark,
      baudRate: port.settings.baudRate,
      path: port.settings.path
    }
  }
}

export const write = async (string: string) => {
  port?.write(string)
}

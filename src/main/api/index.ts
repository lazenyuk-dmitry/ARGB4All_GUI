import { ipcMain } from 'electron'
import { connect, getPortsList, write } from './serial-port'
import { SerialPortOpenOptions } from './types/serial-port'

export const initMainApi = () => {
  ipcMain.handle('serialPort:list', getPortsList)
  ipcMain.handle('serialPort:connect', (_event, options: SerialPortOpenOptions) => connect(options))
  ipcMain.handle('serialPort:write', (_event, string: string) => write(string))
}

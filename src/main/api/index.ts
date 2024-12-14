import { ipcMain } from 'electron'
import { getPortsList } from './serial-port'

export const initMainApi = () => {
  ipcMain.handle('serialPort:list', getPortsList)
}

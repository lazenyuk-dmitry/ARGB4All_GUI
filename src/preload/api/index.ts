import { ipcRenderer } from 'electron'
import { ConnectionInfo, SerialPortOpenOptions } from '../../main/api/types/serial-port'
import { SubscribeChannel } from '../types'

export default {
  serialPort: {
    list: () => ipcRenderer.invoke('serialPort:list'),
    connect: (options: SerialPortOpenOptions): Promise<ConnectionInfo> => {
      return ipcRenderer.invoke('serialPort:connect', options)
    },
    write: (string: string) => ipcRenderer.invoke('serialPort:write', string),
    on: (
      event: SubscribeChannel,
      callback: (event: Electron.IpcRendererEvent, ...args: string[]) => void
    ) => {
      ipcRenderer.on(`serialPort:${event}`, callback)
    }
  }
}

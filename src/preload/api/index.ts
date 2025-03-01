import { ipcRenderer } from 'electron'
import { ConnectionInfo, SerialPortOpenOptions } from '../../main/api/types/serial-port'

export default {
  serialPort: {
    list: () => ipcRenderer.invoke('serialPort:list'),
    connect: (options: SerialPortOpenOptions): Promise<ConnectionInfo> => {
      return ipcRenderer.invoke('serialPort:connect', options)
    },
    write: (string: string) => ipcRenderer.invoke('serialPort:write', string),
    subscribe: (callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => {
      ipcRenderer.on('serialPort:data', callback)
    }
  }
}

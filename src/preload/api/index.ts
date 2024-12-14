import { ipcRenderer } from 'electron'
import { ConnectionInfo, SerialPortOpenOptions } from '../../main/api/types/serial-port'

export default {
  serialPort: {
    list: () => ipcRenderer.invoke('serialPort:list'),
    connect: (options: SerialPortOpenOptions): Promise<ConnectionInfo> => {
      return ipcRenderer.invoke('serialPort:connect', options)
    },
    send: (string: JSON) => ipcRenderer.invoke('serialPort:send', string)
  }
}

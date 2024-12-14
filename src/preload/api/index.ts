import { ipcRenderer } from 'electron'

export default {
  serialPort: {
    list: () => ipcRenderer.invoke('serialPort:list')
  }
}

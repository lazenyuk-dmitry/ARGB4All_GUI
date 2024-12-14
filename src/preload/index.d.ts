import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      serialPort: {
        list: () => Promise<PortInfo[]>
      }
    }
  }
}

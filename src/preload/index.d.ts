import { ElectronAPI } from '@electron-toolkit/preload'
import type { PortInfo } from '@serialport/bindings-interface'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      serialPort: {
        list: () => Promise<PortInfo[]>
        connect: (options: SerialPortOpenOptions) => Promise<ConnectionInfo>
        send: (string: JSON) => Promise<string>
      }
    }
  }
}

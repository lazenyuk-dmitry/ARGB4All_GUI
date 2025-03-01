import { ElectronAPI } from '@electron-toolkit/preload'
import type { PortInfo } from '@serialport/bindings-interface'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      serialPort: {
        list: () => Promise<PortInfo[]>
        connect: (options: SerialPortOpenOptions) => Promise<ConnectionInfo>
        write: (string: string) => Promise<string>
        subscribe: (
          callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
        ) => Promise<void>
      }
    }
  }
}

export interface SerialPortOpenOptions {
  path: string
  baudRate?: number
}

export interface ConnectionInfo {
  opening: boolean
  settings: {
    autoOpen: boolean
    endOnClose: boolean
    highWaterMark: number
    baudRate: number
    path: string
  }
}

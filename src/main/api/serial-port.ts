import { SerialPort } from 'serialport'

export const getPortsList = async () => {
  return await SerialPort.list()
}

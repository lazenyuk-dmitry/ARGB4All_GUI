export const parseComData = (data: string) => {
  const [key, value] = data.split(':')
  return {
    key: key,
    value: value
  }
}

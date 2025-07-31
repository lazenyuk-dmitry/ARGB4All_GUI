export const parseComData = (data: string) => {
  const firstParse = data.includes('+') ? data.split('+') : [data]

  return firstParse.map((part) => {
    const [key, value] = part.split(':')
    return {
      key: key,
      value: value
    }
  })
}

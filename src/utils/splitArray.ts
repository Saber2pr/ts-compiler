export const splitArray = <T>(array: T[], interval = 4) => {
  const result: T[][] = []
  let temp: T[] = []
  for (const item of array) {
    temp.push(item)
    if (temp.length === +interval) {
      result.push(temp)
      temp = []
    }
  }
  if (temp.length && +interval > 0) {
    result.push(temp)
  }

  return result
}

export const clearStr = (str: string) => str && str.replace(/^"|^'|"$|'$/g, '')

export const flat = <T>(arr: T[][]): T[] => arr.reduce((acc, ar) => acc.concat(ar), [])
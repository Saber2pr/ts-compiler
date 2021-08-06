export const clearStr = (str: string) => str && str.replace(/^"|^'|"$|'$/, '')

export const flat = <T>(arr: T[][]): T[] => arr.reduce((acc, ar) => acc.concat(ar), [])
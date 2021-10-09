export function scan(reg: RegExp, content: string): RegExpExecArray[]
export function scan(reg: string, content: string): RegExpExecArray[]
export function scan(reg: RegExp | string, content: string): RegExpExecArray[] {
  const scanner = new RegExp(reg)
  let token = scanner.exec(content)
  const result: RegExpExecArray[] = []
  while (token) {
    result.push(token)
    token = scanner.exec(content)
  }
  return result
}

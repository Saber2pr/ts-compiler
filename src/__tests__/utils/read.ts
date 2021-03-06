import fs from 'fs/promises'
import path from 'path'

export const read = async (example: 'code.txt') => {
  const buf = await fs.readFile(path.join(__dirname, `../examples/${example}`))
  return buf.toString()
}

import fs from 'graceful-fs'
import { promisify } from 'util'

import { compile, CompilerOptions } from './compiler'
import { runCode } from './runCode'

/**
 * 读取ts代码并执行，获取export的变量
 */
export async function readTsExport(
  code: string,
  __fileName?: string,
  options?: CompilerOptions
) {
  const result = await compile(code, options)
  const retObj = runCode(result, __fileName)
  return retObj.default ?? retObj
}

/**
 * 读取ts文件并执行，获取export的变量
 */
export async function readTsFileExport(
  __fileName: string,
  options?: CompilerOptions
) {
  const buffer = await promisify(fs.readFile)(__fileName)
  const code = buffer.toString()
  return readTsExport(code, __fileName, options)
}

import fs from 'fs';
import ts from 'typescript/lib/typescript';
import { promisify } from 'util';

import { compile, context } from './compiler';
import { runCode } from './runCode';

/**
 * 读取ts代码并执行，获取export的变量
 */
export async function readTsExport(code: string, compilerOptions?: ts.CompilerOptions) {
  const result = await compile(code, compilerOptions)
  const retObj = runCode(result, context)
  return retObj.default ?? retObj
}

/**
 * 读取ts文件并执行，获取export的变量
 */
export async function readTsFileExport(file: string, compilerOptions?: ts.CompilerOptions) {
  const buffer = await promisify(fs.readFile)(file)
  const code = buffer.toString()
  const result = await compile(code, compilerOptions)
  const retObj = runCode(result, context)
  return retObj.default ?? retObj
}
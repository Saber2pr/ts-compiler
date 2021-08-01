import fs from 'fs';
import ts from 'typescript/lib/typescript';
import { promisify } from 'util';

import { compile, globalVars } from './compiler';
import { runCode } from './runCode';

/**
 * 读取ts代码并执行，获取export的变量
 */
export async function readTsExport(code: string, compilerOptions?: ts.CompilerOptions, context?: any) {
  const result = await compile(code, compilerOptions, context)
  const retObj = runCode(result, globalVars)
  return retObj.default ?? retObj
}

/**
 * 读取ts文件并执行，获取export的变量
 */
export async function readTsFileExport(file: string, compilerOptions?: ts.CompilerOptions, context?: any) {
  const buffer = await promisify(fs.readFile)(file)
  const code = buffer.toString()
  return readTsExport(code, compilerOptions, context)
}
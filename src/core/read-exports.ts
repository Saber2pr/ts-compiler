import fs from 'fs';
import ts from 'typescript/lib/typescript';
import { promisify } from 'util';
import vm from 'vm';

import { compile, context } from './compiler';

/**
 * 读取ts代码并执行，获取export的变量
 */
export async function readTsExport(code: string, compilerOptions?: ts.CompilerOptions) {
  const result = await compile(code, compilerOptions)
  // 创建执行上下文
  return vm.runInContext(result, vm.createContext(context))
}

/**
 * 读取ts文件并执行，获取export的变量
 */
export async function readTsFileExport(file: string, compilerOptions?: ts.CompilerOptions) {
  const buffer = await promisify(fs.readFile)(file)
  const code = buffer.toString()
  const result = await compile(code, compilerOptions)
  // 创建执行上下文
  return vm.runInContext(result, vm.createContext(context))
}
import fs from 'fs';
import { resolve } from 'path';
import ts from 'typescript';
import { promisify } from 'util';
import vm from 'vm';

// 配置nodejs模块，当ts编译时，将文件注入到nodejs全局模块
const context = {}
const contextModule = {
  ...module, require: (id: string) => {
    const uri = resolve(id)
    if (uri in context) {
      vm.runInContext(context[uri], vm.createContext(contextModule))
      return contextModule.exports
    }
    return module.require(id)
  }
}

/**
 * 编译ts代码字符串，输出js字符串
 */
export function compile(code: string, compilerOptions?: ts.CompilerOptions) {
  return new Promise<string>((resolve) => {
    // tsconfig 配置
    const options: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      suppressOutputPathCheck: false,
      ...(compilerOptions ?? {})
    };

    // 创建一个ts编译器
    const compilerHost = ts.createCompilerHost(options);

    // 创建一个uuid
    const taskId = `${setTimeout(() => { })}.ts`

    // 拦截获取文件，返回对应code。类似req、res
    const originalGetSourceFile = compilerHost.getSourceFile;
    compilerHost.getSourceFile = (fileName) => {
      if (fileName === taskId) {
        return ts.createSourceFile(fileName, code, ts.ScriptTarget.ES2015, true)
      }
      else {
        return originalGetSourceFile.call(compilerHost, fileName);
      }
    };

    // 监听文件输出
    compilerHost.writeFile = (fileName, data) => {
      context[fileName.split('.')[0]] = data
      if (fileName.replace(/\.js$/, '.ts') === taskId) {
        resolve(data)
      }
    };

    // 创建编译进程
    const program = ts.createProgram([taskId], options, compilerHost);
    // 开始编译
    program.emit();
  })
}

/**
 * 读取ts代码并执行，获取export的变量
 */
export async function readTsExport(code: string, compilerOptions?: ts.CompilerOptions) {
  const result = await compile(code, compilerOptions)
  // 创建执行上下文
  return vm.runInContext(result, vm.createContext(contextModule))
}

/**
 * 读取ts文件并执行，获取export的变量
 */
export async function readTsFileExport(file: string, compilerOptions?: ts.CompilerOptions) {
  const buffer = await promisify(fs.readFile)(file)
  const code = buffer.toString()
  const result = await compile(code, compilerOptions)
  // 创建执行上下文
  return vm.runInContext(result, vm.createContext(contextModule))
}
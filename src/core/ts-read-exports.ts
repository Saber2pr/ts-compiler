import fs from 'fs/promises';
import ts from 'typescript';
import vm from 'vm'

/**
 * 编译ts代码字符串，输出js字符串
 */
export function read(code: string, compilerOptions?: ts.CompilerOptions) {
  return new Promise<string>((resolve) => {
    // tsconfig 配置
    const options = {
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
 * 编译ts文件，输出js字符串
 */
export async function readTsFile(file: string, compilerOptions?: ts.CompilerOptions) {
  const buffer = await fs.readFile(file)
  const code = buffer.toString()
  const result = await read(code, compilerOptions)
  return result
}

/**
 * 读取ts代码并执行，获取export的变量
 */
export async function readTsFileExport(file: string, compilerOptions?: ts.CompilerOptions) {
  const buffer = await fs.readFile(file)
  const code = buffer.toString()
  const result = await read(code, compilerOptions)
  // 从nodejs全局上下文执行
  return vm.runInContext(result, vm.createContext(module))
}
import path from 'path';
import ts from 'typescript/lib/typescript';

export let contextModuleMap = {}

export type CompilerOptions = {
  compilerOptions?: ts.CompilerOptions
  context?: any
  transformers?: ts.CustomTransformers
}

/**
 * 编译ts代码字符串，输出js字符串
 */
export function compile(code: string, options?: CompilerOptions) {
  const context = options?.context
  const compilerOptions = options?.compilerOptions
  const transformers = options?.transformers

  contextModuleMap = typeof context === 'object' ? context : {}

  return new Promise<string>(async (resolve) => {
    // tsconfig 配置
    const options: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      jsx: ts.JsxEmit.React,
      ...(compilerOptions ?? {})
    };

    // 创建一个ts编译器读写器
    const compilerHost = ts.createCompilerHost(options);

    // 创建入口文件
    const uuid = setTimeout(() => { })
    const sourceFile = { fileName: `${uuid}.tsx`, sourceText: code, outputFileName: `${uuid}.js` }

    // 重写readFile
    const originalGetSourceFile = compilerHost.getSourceFile;
    compilerHost.getSourceFile = fileName => {
      if (fileName === sourceFile.fileName) {
        return ts.createSourceFile(fileName, code, options.target, true)
      } else {
        return originalGetSourceFile.call(compilerHost, fileName);
      }
    };

    // 将编译输出的文件写入moduleMap
    compilerHost.writeFile = (fileName, data) => {
      contextModuleMap[path.resolve(fileName).split('.')[0]] = data
      if (fileName === sourceFile.outputFileName) {
        resolve(data)
      }
    };

    // 创建编译器
    const program = ts.createProgram([sourceFile.fileName], options, compilerHost);

    // 输出结果
    program.emit(undefined, undefined, undefined, undefined, transformers);
  })
}

// 类型擦除不会进行类型检查
export const transpile = (code: string, options?: CompilerOptions) => ts.transpileModule(code, options)

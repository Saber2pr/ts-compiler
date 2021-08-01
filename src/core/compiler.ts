import path from 'path';
import ts from 'typescript/lib/typescript';

export let contextModuleMap = {}

export type CompilerOptions = {
  compilerOptions?: ts.CompilerOptions
  context?: any
  visit?(node: ts.Node): any
}

/**
 * 编译ts代码字符串，输出js字符串
 */
export function compile(code: string, options?: CompilerOptions) {
  const context = options?.context
  const compilerOptions = options?.compilerOptions
  const visit = options?.visit

  contextModuleMap = typeof context === 'object' ? context : {}

  return new Promise<string>(async (resolve) => {
    // tsconfig 配置
    const options: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      suppressOutputPathCheck: false,
      ...(compilerOptions ?? {})
    };

    // 创建一个ts编译器读写器
    const compilerHost = ts.createCompilerHost(options);

    // 创建入口文件
    const uuid = setTimeout(() => { })
    const sourceFile = { fileName: `${uuid}.ts`, sourceText: code, outputFileName: `${uuid}.js` }

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

    // 遍历ast
    if (visit) {
      const rootNode = program.getSourceFiles().filter(sourceFile => !sourceFile.isDeclarationFile)[0]
      await visit(rootNode)
    }

    // 输出结果
    program.emit();
  })
}

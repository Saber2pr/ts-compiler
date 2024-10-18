import ts from 'typescript/lib/typescript'

import { Entry, Options } from '@nodelib/fs.walk'

import { utils } from '../utils/util'
import { walkFile } from '../utils/walkFile'

export type ImportStatement = {
  library: string
  default?: string
  bindings?: string[]
  file?: string
  pos: number
  end: number
}

/**
 * 解析代码中的import语句
 */
export const parseImportNames = (sourceCode: string, file?: string) => {
  const result: ImportStatement[] = []

  const sourceFile = ts.createSourceFile('example.ts', sourceCode, 99, true)

  // 遍历 AST 节点，提取 ImportDeclaration
  ts.forEachChild(sourceFile, node => {
    if (ts.isImportDeclaration(node)) {
      const statement: ImportStatement = {
        // 导入的包名或路径
        library: utils.clearStr(node.moduleSpecifier.getText()),
        pos: node.pos,
        end: node.end,
      }
      // 默认导入
      const defaultImport = node.importClause?.name
      if (defaultImport) {
        statement.default = defaultImport.getText()
      }
      // 解构导入
      const bindings = node.importClause?.namedBindings
      if (bindings && bindings.getChildren()) {
        statement.bindings = bindings
          .getChildren()
          .map(item =>
            item
              .getChildren()
              .filter(item => item.kind === ts.SyntaxKind.ImportSpecifier)
              .map(item => item.getText())
          )
          .flat()
      }
      // 额外信息
      if (file) {
        statement.file = file
      }
      result.push(statement)
    }
  })

  return result
}

export type FileImport = {
  file: string
  imports: ImportStatement[]
}

/**
 * 遍历文件夹下所有文件，提取所有import语句
 */
export async function getImports(dirPath: string): Promise<ImportStatement[]>
export async function getImports(
  dirPath: string,
  fliter: (entry: Entry) => boolean
): Promise<ImportStatement[]>
export async function getImports(
  dirPath: string,
  fliter: (entry: Entry) => boolean,
  flatImports: true
): Promise<ImportStatement[]>
export async function getImports(
  dirPath: string,
  fliter: (entry: Entry) => boolean,
  flatImports: true,
  ops: Options
): Promise<ImportStatement[]>
export async function getImports(
  dirPath: string,
  fliter: (entry: Entry) => boolean,
  flatImports: false
): Promise<FileImport[]>
export async function getImports(
  dirPath: string,
  fliter: (entry: Entry) => boolean,
  flatImports: false,
  ops: Options
): Promise<FileImport[]>
export async function getImports(
  dirPath: string,
  fliter?: (entry: Entry) => boolean,
  flatImports: true | false = true,
  ops?: Options
): Promise<FileImport[] | ImportStatement[]> {
  // 遍历文件树
  const files = await walkFile(dirPath, fliter, ops)

  const list: FileImport[] = []
  const imports: ImportStatement[] = []

  if (flatImports) {
    for (const file of files) {
      imports.push(...parseImportNames(file.content, file.path))
    }
  } else {
    for (const file of files) {
      list.push({
        file: file.path,
        // 解析导入语句
        imports: parseImportNames(file.content, file.path),
      })
    }
  }

  return flatImports ? imports : list
}

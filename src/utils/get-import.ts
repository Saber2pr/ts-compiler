import ts from 'typescript/lib/typescript';

import { Entry } from '@nodelib/fs.walk';

import { traverseFromString } from '../core';
import { utils } from './util';
import { walkFile } from './walkFile';

export type ImportStatement = {
  library: string
  default?: string
  bindings?: string[]
  file?: string
}

export const parseImportNames = (code: string, file?: string) => {
  const result: ImportStatement[] = []
  traverseFromString(code, node => {
    // 判断是导入声明
    if (ts.isImportDeclaration(node)) {
      const statement: ImportStatement = {
        // 导入的包名或路径
        library: utils.clearStr(node.moduleSpecifier.getText())
      }
      // 默认导入
      const defaultImport = node.importClause?.name
      if (defaultImport) {
        statement.default = defaultImport.getText()
      }
      // 解构导入
      const bindings = node.importClause?.namedBindings as ts.NamedImports
      if (bindings && bindings.elements) {
        statement.bindings = bindings.elements.map(item => item.getText())
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

export async function getImports(dirPath: string): Promise<FileImport[]>
export async function getImports(dirPath: string, fliter?: (entry: Entry) => boolean): Promise<FileImport[]>
export async function getImports(dirPath: string, fliter?: (entry: Entry) => boolean, flatImports?: true): Promise<ImportStatement[]>
export async function getImports(dirPath: string, fliter?: (entry: Entry) => boolean, flatImports?: false): Promise<FileImport[]>
export async function getImports(dirPath: string, fliter?: (entry: Entry) => boolean, flatImports: true | false = true): Promise<FileImport[] | ImportStatement[]> {
  // 遍历文件树
  const files = await walkFile(dirPath, fliter)

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
        imports: parseImportNames(file.content, file.path)
      })
    }
  }

  return flatImports ? imports : list
}

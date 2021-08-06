import ts from 'typescript/lib/typescript';

import { traverseFromString } from '../core';
import { flat } from './util';
import { walkFile } from './walkFile';

type ImportStatement = {
  library: string
  default?: string
  bindings?: string[]
}

const parseImportNames = (code: string) => {
  const result: ImportStatement[] = []
  traverseFromString(code, node => {
    // 判断是导入声明
    if (ts.isImportDeclaration(node)) {
      const statement: ImportStatement = {
        // 导入的包名或路径
        library: node.moduleSpecifier.getText()
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
      result.push(statement)
    }
  })
  return result
}

export const getImports = async (dirPath: string) => {
  // 遍历文件树
  const files = await walkFile(dirPath)
  // 解析导入语句
  const names = await Promise.all(files.map(file => parseImportNames(file.content)))
  return flat(names)
}
import ts from 'typescript/lib/typescript'

import { traverseFromString } from '../traverser'

describe('AstGetImportStatement', () => {
  const code = `
  import { key1 } from "./keys";
  const p = require('path')
  import Path, { parse } from 'path'
  
  export default {};
  `

  it('NamedImports', async () => {
    const result = []
    traverseFromString(code, node => {
      if (node.kind === ts.SyntaxKind.NamedImports) {
        result.push(node.getText())
      }
    })
    expect(result).toEqual(['{ key1 }', '{ parse }'])
  })

  it('ImportSpecifier', async () => {
    const result = []
    traverseFromString(code, node => {
      if (node.kind === ts.SyntaxKind.ImportSpecifier) {
        result.push(node.getText())
      }
    })
    expect(result).toEqual(['key1', 'parse'])
  })

  it('ImportDeclaration', async () => {
    const result = []
    traverseFromString(code, node => {
      if (node.kind === ts.SyntaxKind.ImportDeclaration) {
        result.push(node.getText())
      }
    })
    expect(result).toEqual([
      'import { key1 } from "./keys";',
      "import Path, { parse } from 'path'",
    ])
  })

  it('ImportClause', async () => {
    const result = []
    traverseFromString(code, node => {
      if (node.kind === ts.SyntaxKind.ImportClause) {
        result.push(node.getText())
      }
    })
    expect(result).toEqual(['{ key1 }', 'Path, { parse }'])
  })
})

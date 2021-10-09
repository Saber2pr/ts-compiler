import { SyntaxKind } from 'typescript/lib/typescript'
import fs from 'fs/promises'
import { join } from 'path'

const tsd = join(
  __dirname,
  '../../../node_modules/typescript/lib/typescript.d.ts'
)

const outputPath = join(__dirname, '../../traverser/finder.ts')

const __factory = `import ts from 'typescript/lib/typescript'

import { traverse } from './traverser'

export const findNodes = <T extends ts.Node | ts.Type>(
  root: ts.Node,
  kind: ts.SyntaxKind
): T[] => {
  const result: T[] = []
  traverse(root, node => {
    if (node.kind === kind) {
      result.push(<T>node)
    }
  })
  return result
}`

const createFinder = (key: string) =>
  `export function find${key}(root: ts.Node) {
  return findNodes<ts.${key}>(root, ts.SyntaxKind.${key})
}`

const isNodeKey = (tsd: string, key: string) => {
  if (/^\d+$/.test(key)) return false
  if (/Keyword$/.test(key)) return false
  // black list
  if (
    [
      'Parameter',
      'Constructor',
      'GetAccessor',
      'SetAccessor',
      'CallSignature',
      'ConstructSignature',
      'IndexSignature',
      'TypePredicate',
      'FunctionType',
      'ConstructorType',
      'TypeQuery',
      'TypeLiteral',
      'ArrayType',
      'OptionalType',
      'RestType',
      'InferType',
      'ParenthesizedType',
      'ThisType',
      'TypeOperator',
      'MappedType',
      'ImportType',
      'TypeAssertionExpression',
      'JSDocComment',
    ].includes(key)
  ) {
    return false
  }

  const kind = `readonly kind: SyntaxKind.${key};`
  return tsd.includes(kind)
}

const codeGenFinder = async () => {
  const buf = await fs.readFile(tsd)
  const tsdCode = buf.toString()
  const keys = Object.keys(SyntaxKind).filter(key => isNodeKey(tsdCode, key))
  const output = keys.map(key => createFinder(key)).join('\n')

  await fs.writeFile(outputPath, `${__factory}\n\n${output}`)
}

codeGenFinder()

import ts from 'typescript/lib/typescript'
import { createAstNode } from '../traverser'

/**
 * 提供一个transform helper函数
 */
export function visitNodes(
  node: ts.Node,
  context: ts.TransformationContext,
  callback: (node: ts.Node, context: ts.TransformationContext) => ts.Node
): ts.SourceFile
export function visitNodes(
  node: ts.Node,
  context: ts.TransformationContext,
  callback: (node: ts.Node, context: ts.TransformationContext) => ts.Node
): ts.Node {
  const newNode = callback(node, context)
  if (node !== newNode) {
    return newNode
  }
  return ts.visitEachChild(
    node,
    childNode => visitNodes(childNode, context, callback),
    context
  )
}

/**
 * 创建一个ast转换器
 */
export const createTransformer =
  (
    callback: (node: ts.Node, context: ts.TransformationContext) => ts.Node
  ): ts.TransformerFactory<ts.SourceFile> =>
  context =>
  node =>
    visitNodes(node, context, callback)

export const transform = (
  text: string,
  transformers: ts.TransformerFactory<ts.SourceFile>[],
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
) => {
  const ast = createAstNode(text, scriptKind)
  const newAst = ts.transform(ast, transformers)
  const printer = ts.createPrinter()
  return printer.printNode(ts.EmitHint.SourceFile, newAst.transformed[0], ast)
}

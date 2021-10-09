import ts from 'typescript/lib/typescript'

/**
 * 创建一个ast节点
 */
export const createAstNode = (
  code: string,
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
) =>
  ts.createSourceFile(
    `${setTimeout(() => {})}`,
    code,
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true,
    scriptKind
  )

/**
 * 递归遍历ast所有节点
 */
export const traverse = (node: ts.Node, callback: (node: ts.Node) => void) => {
  callback(node)
  node.forEachChild(node => traverse(node, callback))
}

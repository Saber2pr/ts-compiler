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

/**
 * 从一段代码创建一个ast并遍历节点
 * @deprecated use traverse instead
 */
export const traverseFromString = (
  code: string,
  callback: (node: ts.Node) => void,
  scriptKind?: ts.ScriptKind
) => {
  const root = createAstNode(code, scriptKind)
  traverse(root, callback)
}

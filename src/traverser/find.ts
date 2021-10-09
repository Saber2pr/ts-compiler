import ts from 'typescript/lib/typescript'
import { findNodes } from './finder'
import { traverse } from './traverser'

export function findJsxElementByTagName(root: ts.Node, tagName: string) {
  const result: Array<ts.JsxElement | ts.JsxSelfClosingElement> = []
  traverse(root, node => {
    if (ts.isJsxSelfClosingElement(node)) {
      if (node.tagName.getText() === tagName) {
        result.push(node)
      }
    }
    if (ts.isJsxElement(node)) {
      if (node.openingElement.tagName.getText() === tagName) {
        result.push(node)
      }
    }
    return false
  })
  return result
}

export function findSelector(
  root: ts.Node,
  selectors: ts.SyntaxKind[]
): ts.Node[] {
  if (selectors.length === 0) return []
  const nodes = findNodes(root, selectors[0])
  if (selectors.length === 1) return nodes
  return nodes.reduce(
    (acc, node) => acc.concat(findSelector(node, selectors.slice(1))),
    []
  )
}

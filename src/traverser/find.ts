import ts from 'typescript/lib/typescript'
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

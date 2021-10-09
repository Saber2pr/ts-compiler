import ts from 'typescript/lib/typescript'

import { traverse } from './traverser'

export const getReturnResult = (node: ts.Node) => {
  if (ts.isReturnStatement(node)) {
    const result = node.getChildAt(1)
    if (ts.isParenthesizedExpression(result)) {
      return result.getChildAt(1)
    }
    return result
  }
}

export const getReturnJsxSelfClosingElement = (node: ts.Node) => {
  const result = getReturnResult(node)
  if (result && ts.isJsxSelfClosingElement(result)) {
    return result
  }
}

export const getReturnJsxElement = (node: ts.Node) => {
  const result = getReturnResult(node)
  if (result && ts.isJsxElement(result)) {
    return result
  }
}

export const getPropertyAssignment = (node: ts.Node) => {
  if (ts.isPropertyAssignment(node)) {
    return node
  }
}

export const getJsxAttribute = (node: ts.Node) => {
  if (ts.isJsxAttribute(node)) {
    return node
  }
}

export const findAllReturnJsx = (root: ts.Node) => {
  const result: (ts.JsxSelfClosingElement | ts.JsxElement)[] = []
  traverse(root, node => {
    const jsxSelf = getReturnJsxSelfClosingElement(node)
    if (jsxSelf) {
      result.push(jsxSelf)
    }
    const jsx = getReturnJsxElement(node)
    if (jsx) {
      result.push(jsx)
    }
  })
  return result
}

export const findAllPropAssign = (root: ts.Node) => {
  const result: ts.PropertyAssignment[] = []
  traverse(root, node => {
    const prop = getPropertyAssignment(node)
    if (prop) {
      result.push(prop)
    }
  })
  return result
}

export const findAllJsxAttribute = (root: ts.Node) => {
  const result: ts.JsxAttribute[] = []
  traverse(root, node => {
    const attr = getJsxAttribute(node)
    if (attr) {
      result.push(attr)
    }
  })
  return result
}

export const findDefaultExport = (root: ts.Node) => {
  const result: ts.ExportAssignment[] = []
  traverse(root, node => {
    if (ts.isExportAssignment(node)) {
      result.push(node)
    }
  })
  return result[0]
}

export const findAllObject = (root: ts.Node) => {
  const result: ts.ObjectLiteralExpression[] = []
  traverse(root, node => {
    if (ts.isObjectLiteralExpression(node)) {
      result.push(node)
    }
  })
  return result
}

export const findAllArray = (root: ts.Node) => {
  const result: ts.ArrayLiteralExpression[] = []
  traverse(root, node => {
    if (ts.isArrayLiteralExpression(node)) {
      result.push(node)
    }
  })
  return result
}

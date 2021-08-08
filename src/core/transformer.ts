import ts from 'typescript/lib/typescript';

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
  const newNode = callback(node, context);
  if (node !== newNode) {
    return newNode;
  }
  return ts.visitEachChild(node, childNode => visitNodes(childNode, context, callback), context);
}

export const createTransformer = (callback: (node: ts.Node, context: ts.TransformationContext) => ts.Node): ts.TransformerFactory<ts.SourceFile> =>
  context => node => visitNodes(node, context, callback)
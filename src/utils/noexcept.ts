import ts from 'typescript/lib/typescript';

import { createTransformer } from '../core';

/**
 * 函数添加noexcept注释，在编译阶段会自动添加try catch
 */
export const transformNoExcept = createTransformer(node => {
  // 判断是否是函数声明
  if (ts.isFunctionDeclaration(node)) {
    // 查找jsdoc标签
    const enable = !!ts.getJSDocTags(node).find(tag => {
      return tag.tagName.escapedText === 'noexcept'
    })
    // 如果使用了noexcept注释
    if (enable) {
      // 返回一个新的函数声明
      return ts.factory.createFunctionDeclaration(
        node.decorators,
        node.modifiers,
        node.asteriskToken,
        node.name,
        node.typeParameters,
        node.parameters,
        node.type, // 这以上函数签名都保持不变，下面只修改函数体部分
        ts.factory.createBlock([
          // 创建一个try catch语句
          ts.factory.createTryStatement(
            node.body, // try 中是函数体内容，下面创建catch语句部分
            ts.factory.createCatchClause('error', ts.factory.createBlock([
              ts.factory.createExpressionStatement(// 创建一个语句
                ts.factory.createCallExpression( // 创建调用语句，即console.log(error)
                  ts.factory.createIdentifier('console.log'), // 创建一个标识符（函数调用） 
                  [], // 类型参数，无
                  [ts.factory.createIdentifier('error')]) // 创建一个标识符（函数参数）
              )
            ])),
            undefined // finally就不创建了，只需要处理catch
          )
        ])
      )
    }
  }
  // 其他节点不处理，直接返回
  return node
})
import ts from 'typescript/lib/typescript';

import { transpile } from './core/compiler';
import { visitNodes } from './core/transformer';

const code = `
/**
 * @noexcept
 */
function main (): number {
  throw new Error()
}

main()
`

const result = transpile(code, {
  transformers: {
    before: [
      context => (node: ts.SourceFile) => {
        return visitNodes(node, context, node => {
          if (ts.isFunctionDeclaration(node)) {
            const useLogger = !!ts.getJSDocTags(node).find(tag => {
              return tag.tagName.escapedText === 'noexcept'
            })
            if (useLogger) {
              return ts.factory.createFunctionDeclaration(
                node.decorators,
                node.modifiers,
                node.asteriskToken,
                node.name,
                node.typeParameters,
                node.parameters,
                node.type,
                ts.factory.createBlock([
                  ts.factory.createTryStatement(node.body,
                    ts.factory.createCatchClause('error', ts.factory.createBlock([
                      ts.factory.createExpressionStatement(
                        ts.factory.createCallExpression(
                          ts.factory.createIdentifier('console.log'),
                          [],
                          [ts.factory.createIdentifier('error')])
                      )
                    ])),
                    undefined
                  )
                ])
              )
            }
          }
          return node
        })
      }
    ]
  }
})

console.log(result)
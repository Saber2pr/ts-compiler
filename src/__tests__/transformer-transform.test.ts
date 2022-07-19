import { createTransformer } from '../transformer/transformer'
import { transform } from '../transformer'
import ts from 'typescript/lib/typescript'

describe('Transform', () => {
  it('transform', () => {
    const code = `
interface Test {
  name: string;
}
`

    const result = transform(code, [
      createTransformer(node => {
        // 找到属性
        if (ts.isPropertySignature(node)) {
          return ts.addSyntheticLeadingComment(
            node,
            ts.SyntaxKind.MultiLineCommentTrivia,
            `this is a jsdoc comment`,
            true
          )
        }
        return node
      }),
    ])

    expect(result).toMatchSnapshot()
  })
})

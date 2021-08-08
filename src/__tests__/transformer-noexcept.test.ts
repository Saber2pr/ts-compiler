import ts from 'typescript/lib/typescript';

import { transpile } from '../core';
import { transformNoExcept } from '../utils/noexcept';

describe('Transform', () => {
  it('NoExcept', () => {
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
          transformNoExcept
        ]
      }
    })

    expect(result.outputText).toMatchSnapshot()
  })
})
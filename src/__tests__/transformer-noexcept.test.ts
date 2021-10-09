import { transpile } from '../compiler'
import { transformNoExcept } from '../transformer/noexcept'

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
        before: [transformNoExcept],
      },
    })

    expect(result.outputText).toMatchSnapshot()
  })
})

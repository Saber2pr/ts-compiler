import { traverser } from '..'
import { read } from './utils/read'

describe('Traverser', () => {
  it('findAllReturnJsx', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    expect(
      traverser.findAllReturnJsx(root).map(n => n.getText())
    ).toMatchSnapshot()
  })
  it('findAllPropAssign', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    expect(
      traverser.findAllPropAssign(root).map(n => n.getText())
    ).toMatchSnapshot()
  })
  it('findAllJsxAttribute', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    expect(
      traverser.findAllJsxAttribute(root).map(n => n.getText())
    ).toMatchSnapshot()
  })

  it('findAllJsxAttribute AllProp', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    const attrs = traverser.findAllJsxAttribute(root)
    const node = attrs.filter(attr => attr.getText().startsWith('list='))[0]
    expect(
      traverser.findAllPropAssign(node).map(n => n.getText())
    ).toMatchSnapshot()
  })

  it('findDefaultExport', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    const exp = traverser.findDefaultExport(root)
    expect(exp.getText()).toMatchSnapshot()
  })
})

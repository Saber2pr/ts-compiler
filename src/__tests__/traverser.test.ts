import { traverser } from '..'
import { read } from './utils/read'

describe('Traverser', () => {
  it('findReturnJsx', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    expect(
      traverser.findReturnStatement(root).map(n => n.getText())
    ).toMatchSnapshot()
  })
  it('findPropAssign', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    expect(
      traverser.findPropertyAssignment(root).map(n => n.getText())
    ).toMatchSnapshot()
  })
  it('findJsxAttribute', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    expect(
      traverser.findJsxAttribute(root).map(n => n.getText())
    ).toMatchSnapshot()
  })

  it('findJsxAttribute AllProp', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    const attrs = traverser.findJsxAttribute(root)
    const node = attrs.filter(attr => attr.getText().startsWith('list='))[0]
    expect(
      traverser.findJsxAttribute(node).map(n => n.getText())
    ).toMatchSnapshot()
  })

  it('findDefaultExport', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    const exp = traverser.findExportAssignment(root)
    expect(exp[0].getText()).toMatchSnapshot()
  })

  it('findObject', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    const obJs = traverser.findObjectLiteralExpression(root)
    expect(obJs.map(o => o.getText())).toMatchSnapshot()
  })

  it('findArray', async () => {
    const code = await read('code.txt')
    const root = traverser.createAstNode(code)
    const arrays = traverser.findArrayLiteralExpression(root)
    expect(arrays.map(o => o.getText())).toMatchSnapshot()
  })
})

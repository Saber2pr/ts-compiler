# @saber2pr/ts-compiler

> read ts exports

```bash
yarn add @saber2pr/ts-compiler
```

### Feature

1. read and run ts code, get export vars.
2. traverse ast, get import names.

### usage

see document: https://saber2pr.top/ts-compiler/

```ts
import { compile, readTsExport, readTsFileExport, traverse, traverseFromString } from '@saber2pr/ts-compiler'

readTsFileExport('./test.ts').then(res => {
  // res is value exported from ./test.ts
  console.log(res)
  console.log(res.test)
})

traverseFromString(`
import React from 'react'

const App = () => <div></div>
`, node => {
  // ast node
})
```

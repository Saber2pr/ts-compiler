# @saber2pr/ts-compiler

[![npm](https://img.shields.io/npm/v/@saber2pr/ts-compiler.svg?color=blue)](https://www.npmjs.com/package/@saber2pr/ts-compiler)
[![codecov](https://codecov.io/gh/Saber2pr/ts-compiler/branch/master/graph/badge.svg?token=DI9E88OIZU)](https://codecov.io/gh/Saber2pr/ts-compiler)

> ts compiler utils.

```bash
yarn add @saber2pr/ts-compiler
```

### Usage

see document: https://saber2pr.top/ts-compiler/

```ts
import {
  readTsExport,
  readTsFileExport,
  traverser,
} from '@saber2pr/ts-compiler'

readTsFileExport('./test.ts').then(res => {
  // res is value exported from ./test.ts
  console.log(res)
  console.log(res.test)
})

traverser.traverseFromString(
  `
import React from 'react'

const App = () => <div></div>
`,
  node => {
    // ast node
  }
)
```

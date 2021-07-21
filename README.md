# @saber2pr/ts-read-exports

> read ts exports

```bash
yarn add @saber2pr/ts-read-exports
```

### usage

```ts
import { compile, readTsExport, readTsFileExport } from '@saber2pr/ts-read-exports'

readTsFileExport('./test.ts').then(res => {
  // res is value exported from ./test.ts
  console.log(res)
  console.log(res.test)
})
```
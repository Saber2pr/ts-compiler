```ts
import ts from 'typescript';

// 简易版ts-loader
function loader(this: webpack.LoaderContext<LoaderOptions>, contents: string) {
  const callback = this.async();
  // transpileOnly 只做类型擦除
  const result = ts.transpileModule(contents, {
    compilerOptions: {}
  })
  // 返回生成的js
  callback(null, result.outputText, null)
}
```
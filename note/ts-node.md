```ts
import ts from 'typescript';

function registerExtension() {
  const old = require.extensions['.ts'];

  require.extensions['.ts'] = function (m: any, filename) {
    const _compile = m._compile;

    // Module.prototype._compile方法，可以对js文件进行编译加载
    // 但是翻了文档并没有指出，只有看nodejs源码才知道
    // https://github.com/nodejs/node/blob/da0ede1ad55a502a25b4139f58aab3fb1ee3bf3f/lib/internal/modules/cjs/loader.js#L1065
    // https://github.com/nodejs/node/blob/da0ede1ad55a502a25b4139f58aab3fb1ee3bf3f/lib/internal/modules/cjs/loader.js#L1017
    // 底层原理是runInThisContext，类似eval
    m._compile = function (code: string, fileName: string) {
      const result = ts.transpileModule(code, {
        compilerOptions: {}
      })
      return _compile.call(this, result, fileName);
    };

    return old(m, filename);
  };
}
```
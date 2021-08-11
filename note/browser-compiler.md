```ts
import ts from "typescript"
import tsvfs from "@typescript/vfs" // 虚拟文件服务
import lzstring from "lz-string" // 一个压缩算法

// 从cdn创建上下文，包含了ts lib的类型库，从cdn拉取
const fsMap = await tsvfs.createDefaultMapFromCDN(compilerOptions, ts.version, true, ts, lzstring)
fsMap.set("index.ts", "// main TypeScript file content")

const system = tsvfs.createSystem(fsMap)
// host是ts编译器将文件操作隔离出来的部分
// 这里可以创建一个虚拟的文件服务，不依赖nodejs，在浏览器中可用
const host = tsvfs.createVirtualCompilerHost(system, compilerOptions, ts)

// 创建编译程序
const program = ts.createProgram({
  rootNames: [...fsMap.keys()],
  options: compilerOptions,
  host: host.compilerHost,
})
```
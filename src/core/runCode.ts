import vm from 'vm';

export const runCode = (code: string, context: any) => {
  // commonjs to esmodule
  vm.runInNewContext(`;((module)=>{${code};exports.default=typeof exports.default=='undefined'?module.exports:exports.default;})({exports})`, vm.createContext(context))
  return context.exports
}
import vm from 'vm';

export const runCode = (code: string, globalVars: any) => {
  // commonjs to esmodule
  vm.runInNewContext(`;((module)=>{${code};exports.default=typeof exports.default=='undefined'?module.exports:exports.default;})({exports})`, vm.createContext(globalVars))
  return globalVars.exports
}
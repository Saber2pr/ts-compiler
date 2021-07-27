import vm from 'vm';

export const runCode = (code: string, context: any) => {
  vm.runInNewContext(`;(()=>{${code}})()`, vm.createContext(context))
  return context.module.exports
}
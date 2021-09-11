import { readFile } from 'graceful-fs';
import { promisify } from 'util';

import * as fsWalk from '@nodelib/fs.walk';

export type EntryResult = fsWalk.Entry & { content: string }

/**
 * 遍历文件夹下所有文件获取
 */
export const walkFile = async (dirPath: string, fliter?: (entry: fsWalk.Entry) => boolean, ops: fsWalk.Options = {}): Promise<EntryResult[]> => {
  const entries = await new Promise<fsWalk.Entry[]>((resolve, reject) => {
    fsWalk.walk(
      dirPath,
      {
        entryFilter: entry => {
          const isNotNodeModules = !entry.path.includes('node_modules/')
          const isNotGit = !entry.path.includes('.git/')
          if(fliter) return isNotNodeModules && isNotGit && fliter(entry)

          const isNotMin = !/\.min\.js$/.test(entry.path)
          const isCode = /\.ts$|\.tsx$|\.js$|\.jsx$/.test(entry.name)
          return (
            isNotNodeModules &&
            isNotGit &&
            isNotMin &&
            isCode
          )
        },
        ...(ops ?? {})
      },
      (error, entries) => {
        if (error) {
          reject(error)
        } else {
          resolve(entries)
        }
      }
    )
  })
  return Promise.all(
    entries.map(node =>
      promisify(readFile)(node.path).then(res => ({
        ...node,
        content: res.toString(),
      }))
    )
  )
}
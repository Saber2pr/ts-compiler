import { readFile } from 'graceful-fs'
import { promisify } from 'util'

import * as fsWalk from '@nodelib/fs.walk'

export type EntryResult = fsWalk.Entry & { content: string }

/**
 * 遍历文件夹下所有文件获取
 */
export const walkFile = async (
  dirPath: string,
  fliter?: (entry: fsWalk.Entry) => boolean,
  ops: fsWalk.Options & { encoding?: BufferEncoding } = {}
): Promise<EntryResult[]> => {
  const entries = await new Promise<fsWalk.Entry[]>((resolve, reject) => {
    fsWalk.walk(
      dirPath,
      {
        deepFilter: entry => {
          const isNotNodeModules = !/node_modules/.test(entry.path)
          const isNotGit = !/\.git(\/|\\)?/.test(entry.path)
          return isNotNodeModules && isNotGit
        },
        entryFilter: entry => {
          if (fliter) return fliter(entry)
          const isCode = /\.ts$|\.tsx$|\.js$|\.jsx$/.test(entry.name)
          return isCode
        },
        ...(ops ?? {}),
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
      promisify(readFile)(node.path, { encoding: ops?.encoding }).then(res => ({
        ...node,
        content: res.toString(),
      }))
    )
  )
}

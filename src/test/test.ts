import { join } from "path";
import { readTsFileExport } from "..";

readTsFileExport(join(process.cwd(), 'strings.ts')).then(res => {
  console.log(res)
  console.log(res.en)
})
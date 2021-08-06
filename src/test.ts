import { join } from 'path';
import { getImports } from './utils/get-import';

getImports(join(process.cwd(), 'src')).then(console.log)
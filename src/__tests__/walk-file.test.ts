import { join } from 'path';

import { walkFile } from '../';

describe('WalkFiles', () => {
  it('Walk Markdown', async () => {
    const files = await walkFile(join(__dirname, '../../.github'), entry => /\.yml$/.test(entry.path))
    expect(files.length).toEqual(2)
  })
})
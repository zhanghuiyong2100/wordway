import fs from 'fs';
import YoudaoWebEngine from '../src';
import { toLookUpResult } from '../src/converts';

describe('converts', () => {
  it('works', async () => {
    const originData = fs.readFileSync('./test/most.txt').toString();

    const r = toLookUpResult(
      new YoudaoWebEngine(),
      'most',
      { exclude: ['originData'] },
      originData
    );
    console.log(JSON.stringify(r, null, 2));

    // expect(r).toEqual(2);
  });
});

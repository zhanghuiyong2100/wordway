import fs from 'fs';
import BingWebEngine from '../src';
import { toLookUpResult } from '../src/converts';

describe('converts', () => {
  it('works', async () => {
    const originData = fs.readFileSync('./test/apples.txt').toString();

    const r = toLookUpResult(
      new BingWebEngine(),
      { exclude: ['originData'] },
      originData
    );
    console.log(JSON.stringify(r, null, 2));

    // expect(r).toEqual(2);
  });
});

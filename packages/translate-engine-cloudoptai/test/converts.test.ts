import fs from 'fs';
import CloudoptAIEngine from '../src';
import { toLookUpResult } from '../src/converts';

describe('converts', () => {
  it('works', async () => {
    const q = 'release';
    const originData = JSON.parse(fs.readFileSync(`./test/${q}.json`).toString());

    const r = toLookUpResult(
      new CloudoptAIEngine(),
      q,
      { exclude: ['originData'] },
      originData
    );
    console.log(JSON.stringify(r, null, 2));

    // expect(r).toEqual(2);
  });
});

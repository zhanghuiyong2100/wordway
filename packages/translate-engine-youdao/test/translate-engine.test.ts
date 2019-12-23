import Translate from '@wordway/translate-api';
import YoudaoEngine from '../src';

describe('translate-engine-iciba', () => {
  it('works', async () => {
    const appKey = '';
    const appSecret = '';

    const client = new Translate(new YoudaoEngine({ appKey, appSecret }));

    const r = await client.translateText('hello');
    console.log(r);

    expect(r).toEqual(2);
  });
});

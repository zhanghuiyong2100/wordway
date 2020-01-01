import Translate from '@wordway/translate-api';
import IcibaEngine from '../src';

describe('translate-engine-iciba', () => {
  it('works', () => {
    const client = new Translate(new IcibaEngine());

    const r = client.translateText('hello');

    expect(r).toEqual(2);
  });
});

import Translate, { TranslateEngine } from '../src';

class MockEngine extends TranslateEngine {
  public get name(): string {
    return 'mock';
  }
  public translateText(q: string, options?: any): Promise<any> {
    console.log(q);
    console.log(options);
    throw new Error('Method not implemented.');
  }
}

describe('translate-api.test', () => {
  it('works', () => {
    const client = new Translate([
      new MockEngine(),
    ]);

    const r = client.firstEngine.translateText('hello');

    expect(r).toEqual(2);
  });
});

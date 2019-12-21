import TranslateEngine from './TranslateEngine';
import TranslateOverrides from './TranslateOverrides';

/**
 * @example
 * const client = new Translate();
 * client.engine('youdao').translateText('hello');
 */
class Translate {
  static overrides: any;

  private engines: Array<TranslateEngine>;

  constructor(engines?: Array<TranslateEngine>) {
    this.engines = engines ?? [];
  }

  get firstEngine(): TranslateEngine {
    return this.engine();
  }

  engine(name?: string): TranslateEngine {
    const engineCount = this.engines.length;
    const engineIndex = !name ? 0 : this.engines.findIndex(v => v.name === name);

    if (engineCount === 0) throw new Error('No translation engine.');
    if (engineIndex < 0)
      throw new Error(`Translation engine \`${name}\` does not exist`);

    return this.engines[engineIndex];
  }
}

Translate.overrides = TranslateOverrides;

export default Translate;

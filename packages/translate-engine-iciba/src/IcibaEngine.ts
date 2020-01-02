import {
  TranslateEngine,
  TranslateOverrides,
  LookUpOptions,
  LookUpResult,
} from '@wordway/translate-api';

import { toLookUpResult } from './converts';

class IcibaEngine extends TranslateEngine {
  private key: string;

  constructor({ key }: any) {
    super();

    this.key = key;
  }

  get name(): string {
    return 'iciba';
  }

  lookUp(
    q: string,
    options?: LookUpOptions | undefined
  ): Promise<LookUpResult> {
    const urlSearchParams = new URLSearchParams(
      Object.entries({
        w: q.toLocaleLowerCase(),
        key: this.key,
        type: 'json',
      })
    );

    return new Promise((resolve, reject) => {
      const successCallback = async (response: any) => {
        const originData = await response.json();
        resolve(toLookUpResult(this, options, originData));
      };
      const failureCallback = (error: any) => reject(error);

      TranslateOverrides.fetch(
        `http://dict-co.iciba.com/api/dictionary.php?${urlSearchParams}`
      )
        .then(successCallback)
        .catch(failureCallback);
    });
  }
}

export default IcibaEngine;

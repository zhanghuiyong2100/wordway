import {
  TranslateEngine,
  TranslateOverrides,
  LookUpOptions,
  LookUpResult,
} from '@wordway/translate-api';

import { toLookUpResult } from './converts';

class BingWebEngine extends TranslateEngine {
  get name(): string {
    return 'bing-web';
  }

  lookUp(
    q: string,
    options?: LookUpOptions | undefined
  ): Promise<LookUpResult> {
    return new Promise((resolve, reject) => {
      const successCallback = async (response: any) => {
        const originData = await response.text();
        resolve(toLookUpResult(this, q, options, originData));
      };
      const failureCallback = (error: any) => reject(error);

      TranslateOverrides.fetch(
        `https://cn.bing.com/dict/search?q=${encodeURIComponent(q)}`
      )
        .then(successCallback)
        .catch(failureCallback);
    });
  }
}

export default BingWebEngine;

import {
  TranslateEngine,
  TranslateOverrides,
  LookUpOptions,
  LookUpResult,
} from '@wordway/translate-api';

import { toLookUpResult } from './converts';

class CloudoptAIEngine extends TranslateEngine {
  get name(): string {
    return 'cloudoptai';
  }

  lookUp(
    q: string,
    options?: LookUpOptions | undefined
  ): Promise<LookUpResult> {
    return new Promise((resolve, reject) => {
      const successCallback = async (response: any) => {
        const originData = await response.json();
        resolve(toLookUpResult(this, q, options, originData));
      };
      const failureCallback = (error: any) => reject(error);

      TranslateOverrides.fetch(
        `https://ai.cloudopt.net/api/v1/dict/${q}`
      )
        .then(successCallback)
        .catch(failureCallback);
    });
  }
}

export default CloudoptAIEngine;

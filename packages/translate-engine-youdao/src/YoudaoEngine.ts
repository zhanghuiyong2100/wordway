import CryptoJS from 'crypto-js';
import {
  TranslateEngine,
  TranslateOverrides,
  LookUpOptions,
  LookUpResult,
} from '@wordway/translate-api';

import { toLookUpResult } from './converts';

class YoudaoEngine extends TranslateEngine {
  private appKey: string;
  private appSecret: string;

  constructor({ appKey, appSecret }: any) {
    super();

    this.appKey = appKey;
    this.appSecret = appSecret;
  }

  get name(): string {
    return 'youdao';
  }

  lookUp(
    q: string,
    options?: LookUpOptions | undefined
  ): Promise<LookUpResult> {
    let input = q;
    if (q.length > 20)
      input = `${q.substr(0, 10)}${q.length}${q.substr(q.length - 10)}`;

    let curtime = (new Date().getTime() / 1000).toFixed(0);
    let salt = CryptoJS.MD5('wordway');
    let sign = CryptoJS.SHA256(
      `${this.appKey}${input}${salt}${curtime}${this.appSecret}`
    );

    const urlSearchParams = new URLSearchParams(
      Object.entries({
        q,
        from: options?.sourceLanguage || 'auto',
        to: options?.targetLanguage || 'auto',
        appKey: this.appKey,
        salt: salt.toString(),
        sign: sign.toString(),
        signType: 'v3',
        curtime,
      })
    );

    return new Promise((resolve, reject) => {
      const successCallback = async (response: any) => {
        const originData = await response.json();
        resolve(toLookUpResult(this, q, options, originData));
      };
      const failureCallback = (error: any) => reject(error);

      TranslateOverrides.fetch(
        `https://openapi.youdao.com/api?${urlSearchParams}`
      )
        .then(successCallback)
        .catch(failureCallback);
    });
  }
}

export default YoudaoEngine;

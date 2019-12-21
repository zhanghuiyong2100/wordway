interface LookUpOptions {
  format?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}
interface LookUpResult {
  engine: string;               // 字典引擎
  word: string;                 // 单词
  definitions?: Array<string>;  // 定义（基本释义）
  ukIpa?: string;               // 英语-英式音标
  ukPronunciationUrl?: string;  // 英语-英式发音链接
  usIpa?: string;               // 英语-美式音标
  usPronunciationUrl?: string;  // 英语-美式发音链接
  tenses?: Array<string>;       // 时态
  sentences?: Array<string>;    // 例句
  originData: any;
}

interface TranslateTextOptions {
  format?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}
interface TranslateTextResult {
  sourceText?: string;
  targetText?: string;
  originData: any;
}

abstract class TranslateEngine {
  public abstract get name(): string;

  public abstract lookUp(
    q: string,
    options?: LookUpOptions
  ): Promise<LookUpResult>;
  public abstract translateText(
    q: string,
    options?: TranslateTextOptions
  ): Promise<TranslateTextResult>;
}

export {
  TranslateEngine as default,
  TranslateEngine,
  LookUpOptions,
  LookUpResult,
  TranslateTextOptions,
  TranslateTextResult,
};

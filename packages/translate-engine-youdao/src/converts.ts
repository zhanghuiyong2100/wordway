import {
  TranslateEngine,
  LookUpOptions,
  LookUpResult,
} from '@wordway/translate-api';

const toLookUpResult = (
  engine: TranslateEngine,
  options: LookUpOptions | undefined,
  originData: any
): LookUpResult => {
  let word;
  let definitions;
  let ukIpa, ukPronunciationUrl;
  let usIpa, usPronunciationUrl;
  let tenses;
  let sourceText, sourceAudioUrl;
  let targetText, targetAudioUrl;

  const {
    query,
    translation,
    basic,
    returnPhrase,
    tSpeakUrl,
    speakUrl,
  } = originData;

  if (!!returnPhrase) {
    word = returnPhrase[0];
  }

  if (basic) {
    const { explains, wfs } = basic;
    if (!!explains) {
      definitions = explains.map((v: any) => {
        const dotIndex = v.indexOf('. ');
        const type = dotIndex >= 0 ? v.substr(0, dotIndex + 1) : undefined;
        const value = dotIndex >= 0 ? v.substr(dotIndex + 2) : '';
        const values = value.split('；');

        return { type, values };
      });
    }

    ukIpa = basic['uk-phonetic'];
    ukPronunciationUrl = basic['uk-speech'];
    usIpa = basic['us-phonetic'];
    usPronunciationUrl = basic['us-speech'];

    if (!!wfs) {
      tenses = wfs.map((v: any) => {
        const {
          wf: { name, value },
        } = v;
        let values = [value];
        if (value.indexOf('或') >= 0) {
          values = value.split('或');
        }

        return { name, values };
      });
    }
  }

  // 翻译
  sourceText = query;
  sourceAudioUrl = speakUrl;
  if (!!translation) {
    targetText = translation[0];
    targetAudioUrl = tSpeakUrl;
  }

  let lookUpResult: LookUpResult = {
    engine: engine.name,
    word,
    definitions,
    ukIpa,
    ukPronunciationUrl,
    usIpa,
    usPronunciationUrl,
    tenses,
    sourceText,
    sourceAudioUrl,
    targetText,
    targetAudioUrl,
    originData,
  };

  if ((options?.exclude || []).indexOf('originData') >= 0) {
    delete lookUpResult.originData;
  }
  return lookUpResult;
};

export { toLookUpResult };

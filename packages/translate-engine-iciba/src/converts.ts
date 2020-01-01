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
  let definitions;
  let tenses;
  let sourceText, sourceAudioUrl;
  let targetText, targetAudioUrl;

  const {
    word_name: word,
    exchange,
    symbols,
  } = originData;

  if (exchange) {
    const tenseTypes: any = {
      word_pl: { type: 'word_pl', name: '复数' },
      word_third: { type: 'word_third', name: '第三人称单数' },
      word_past: { type: 'word_past', name: '过去式' },
      word_done: { type: 'word_done', name: '过去分词' },
      word_ing: { type: 'word_ing', name: '现在分词' },
      word_er: { type: 'word_er', name: '' },
      word_est: { type: 'word_est', name: '' },
    };
    tenses = Object.keys(tenseTypes)
      .map(v => {
        if (!exchange[v] || exchange[v].length == 0) return null;

        return {
          type: tenseTypes[v].type,
          name: tenseTypes[v].name,
          values: exchange[v],
        };
      })
      .filter(v => {
        return v != null;
      });
  }

  const {
    ph_en: ukIpa,
    ph_am: usIpa,
    ph_en_mp3: ukPronunciationUrl,
    ph_am_mp3: usPronunciationUrl,
    parts,
  } = symbols[0];

  if (parts) {
    definitions = parts.map((v: any) => {
      const type = v.part;
      const values = v.means;

      return { type, values };
    });
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

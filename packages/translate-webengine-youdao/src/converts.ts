import cheerio from 'cheerio';
import {
  TranslateEngine,
  LookUpOptions,
  LookUpResult,
} from '@wordway/translate-api';

const toLookUpResult = (
  engine: TranslateEngine,
  q: string,
  options: LookUpOptions | undefined,
  originData: any
): LookUpResult => {
  let word;
  let definitions;
  let ukIpa;
  let ukPronunciationUrl: string | undefined = undefined;
  let usIpa;
  let usPronunciationUrl: string | undefined = undefined;
  let phrases;
  let tenses;
  let sentences;
  let sourceText, sourceAudioUrl;
  let targetText, targetAudioUrl;

  const $ = cheerio.load(originData);

  word = $('.keyword').text();
  definitions = $('#phrsListTab .trans-container > ul > li')
    .toArray()
    .map(e => {
      const v = $(e).text();

      const dotIndex = v.indexOf('. ');
      const type = dotIndex >= 0 ? v.substr(0, dotIndex + 1) : undefined;
      const value = dotIndex >= 0 ? v.substr(dotIndex + 2) : v;
      const values = value.split('；');

      return { type, values };
    });

  $('.baav > .pronounce').each((_, e) => {
    if (
      $(e)
        .text()
        .indexOf('英') >= 0
    ) {
      ukIpa = $(e.childNodes[1])
        .text()
        .replace('[', '')
        .replace(']', '');

      e.childNodes.forEach(childNode => {
        if (!!ukPronunciationUrl) return;

        ukPronunciationUrl = $(childNode).attr('data-rel');
        if (ukPronunciationUrl)
          ukPronunciationUrl = `http://dict.youdao.com/dictvoice?audio=${ukPronunciationUrl}`;
      });
    }

    if (
      $(e)
        .text()
        .indexOf('美') >= 0
    ) {
      usIpa = $(e.childNodes[1])
        .text()
        .replace('[', '')
        .replace(']', '');

      e.childNodes.forEach(childNode => {
        if (!!usPronunciationUrl) return;

        usPronunciationUrl = $(childNode).attr('data-rel');
        if (usPronunciationUrl)
          usPronunciationUrl = `http://dict.youdao.com/dictvoice?audio=${usPronunciationUrl}`;
      });
    }
  });

  phrases = $('#webPhrase > .wordGroup')
    .toArray()
    .map(e => {
      return {
        source: $(e.childNodes[1])
          .text()
          .trim(),
        target: $(e.childNodes[2])
          .text()
          .split(';')
          .map(v => v.trim())
          .join('；')
          .trim(),
      };
    });

  const additional = $('#phrsListTab .trans-container .additional')
    .text()
    .replace('[', '')
    .replace(']', '')
    .trim()
    .split('\n')
    .map(v => v.trim());

  if (additional.join('').length > 0) {
    for (let i = 0; i < additional.length; i += 2) {
      const name = additional[i];
      const value = additional[i + 1];

      let values = [value];
      if (value.indexOf('或') >= 0) {
        values = value.split('或');
      }
      if (!tenses) tenses = [];
      tenses.push({ name, values });
    }
  }

  sentences = $('#examplesToggle #bilingual ul > li')
    .toArray()
    .map(e => {
      const source = $(e.childNodes[1])
        .text()
        .trim();
      const target = $(e.childNodes[3])
        .text()
        .trim();

      return { source, target };
    });

  sourceText = $($('#ydTrans .trans-container > p')[0])
    .text()
    .trim();
  if (sourceText?.length === 0) sourceText = undefined;
  targetText = $($('#ydTrans .trans-container > p')[1])
    .text()
    .trim();
  if (targetText?.length === 0) targetText = undefined;

  let lookUpResult: LookUpResult = {
    engine: engine.name,
    word,
    definitions,
    ukIpa,
    ukPronunciationUrl,
    usIpa,
    usPronunciationUrl,
    phrases,
    tenses,
    sentences,
    sourceText,
    sourceAudioUrl,
    targetText,
    targetAudioUrl,
    originData,
  };

  if (!word && !sourceText) {
    throw Error(`没有找到与 ${q} 相关的结果。`);
  }

  if ((options?.exclude || []).indexOf('originData') >= 0) {
    delete lookUpResult.originData;
  }
  return lookUpResult;
};

export { toLookUpResult };

import cheerio from 'cheerio';
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
  let ukIpa;
  let ukPronunciationUrl: string | undefined = undefined;
  let usIpa;
  let usPronunciationUrl: string | undefined = undefined;
  let tenses;
  let sentences;
  let sourceText, sourceAudioUrl;
  let targetText, targetAudioUrl;

  const $ = cheerio.load(originData);

  word = $('#headword').text();
  definitions = $('.qdef > ul > li')
    .toArray()
    .map(e => {
      const type = $(e.childNodes[0]).text();
      const value = $(e.childNodes[1]).text();
      const values = value?.split('；');

      return { type, values };
    });

  ukIpa = $('.hd_pr')
    .text()
    .replace('英', '')
    .replace('[', '')
    .replace(']', '')
    .trim();
  usIpa = $('.hd_prUS')
    .text()
    .replace('美', '')
    .replace('[', '')
    .replace(']', '')
    .trim();

  $('.hd_tf > .bigaud').each((i, e) => {
    if (i === 0)
      ukPronunciationUrl = $(e)
        .attr('onclick')
        ?.replace("javascript:BilingualDict.Click(this,'", '')
        ?.replace("','akicon.png',false,'dictionaryvoiceid')", '');
    if (i === 1)
      usPronunciationUrl = $(e)
        .attr('onclick')
        ?.replace("javascript:BilingualDict.Click(this,'", '')
        ?.replace("','akicon.png',false,'dictionaryvoiceid')", '');
  });

  const tensesNodes = $('.hd_if').children();

  for (let i = 0; i < tensesNodes.length; i += 2) {
    const name = $(tensesNodes[i])
      .text()
      .replace('：', '');
    const value = $(tensesNodes[i + 1])
      .text()
      .replace('：', '');

    if (!tenses) tenses = [];
    tenses.push({ name, values: [value] });
  }

  sentences = $('#sentenceSeg > .se_li > .se_li1')
    .toArray()
    .map(e => {
      const source = $(e.childNodes[0])
        .text()
        .trim();
      const target = $(e.childNodes[1])
        .text()
        .trim();

      return { source, target };
    });

  sourceText = $('.p1-10')
    .text()
    .trim();
  if (sourceText?.length === 0) sourceText = undefined;
  targetText = $('.p1-11')
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
    tenses,
    sentences,
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

const mockFetch = (): Promise<any> => {
  return new Promise<any>((_, reject) =>
    reject(new Error('fetch is not defined'))
  );
};
const TranslateOverrides = {
  fetch: typeof fetch !== 'undefined' ? fetch : mockFetch,
};

export {
  TranslateOverrides as default,
  TranslateOverrides,
};

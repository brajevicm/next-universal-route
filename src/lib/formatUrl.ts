const replaceHyphenAfterSlash = (string: string) =>
  string.replace(/(^-|-$)/g, '');

const replaceNonAlphabetCharacters = (string: string) =>
  string.replace(/[^a-zA-Z0-9]+/g, '-');

const toLowerCase = (string: string) => string.toLowerCase();

export const formatUrl = (string: string) =>
  toLowerCase(replaceHyphenAfterSlash(replaceNonAlphabetCharacters(string)));

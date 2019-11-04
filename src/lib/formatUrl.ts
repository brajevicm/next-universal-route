const replaceHyphenAfterSlash = (string: string) =>
  string.replace(/(^-|-$)/g, '');

const replaceNonAlphabetCharacters = (string: string) =>
  string.replace(/[^a-zA-Z0-9]+/g, '-');

export const formatUrl = (string: string) =>
  replaceHyphenAfterSlash(replaceNonAlphabetCharacters(string));

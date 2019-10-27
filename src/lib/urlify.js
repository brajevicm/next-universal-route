const replaceHyphenAfterSlash = string => string.replace(/(^-|-$)/g, '');
const replaceNonAlphabetCharacters = string =>
  string.replace(/[^a-zA-Z0-9]+/g, '-');
const toLowerCase = string => string.toLowerCase();

module.exports = string =>
  toLowerCase(replaceHyphenAfterSlash(replaceNonAlphabetCharacters(string)));

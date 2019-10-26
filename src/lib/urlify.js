const flow = require('lodash/flow');

const replaceHyphenAfterSlash = string => string.replace(/(^-|-$)/g, '');
const replaceNonAlphabetCharacters = string =>
  string.replace(/[^a-zA-Z0-9]+/g, '-');
const toLowerCase = string => string.toLowerCase();

module.exports = string =>
  flow(
    toLowerCase,
    replaceNonAlphabetCharacters,
    replaceHyphenAfterSlash
  )(string);

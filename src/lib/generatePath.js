const pathToRegexp = require('path-to-regexp');

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = path => {
  if (cache[path]) return cache[path];

  const generator = pathToRegexp.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount += cacheCount;
  }

  return generator;
};

module.exports = (path = '/', params = {}) => {
  return path === '/' ? path : compilePath(path)(params, { pretty: true });
};

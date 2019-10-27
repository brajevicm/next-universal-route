const pathToRegexp = require('path-to-regexp');

const cache = {};

const compilePath = path => {
  if (cache[path]) {
    return cache[path];
  }

  const generator = pathToRegexp.compile(path);
  cache[path] = generator;

  return generator;
};

module.exports = (path = '/', params = {}) => {
  return path === '/' ? path : compilePath(path)(params, { pretty: true });
};

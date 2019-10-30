import pathToRegexp from 'path-to-regexp';

type StringMap = {
  [key: string]: pathToRegexp.PathFunction;
};

const cache: StringMap = {};

const compilePath = (path: string) => {
  if (cache[path]) {
    return cache[path];
  }

  const generator: pathToRegexp.PathFunction = pathToRegexp.compile(path);
  cache[path] = generator;

  return generator;
};

export const generatePath = (path: string = '/', params: object = {}) => {
  return path === '/' ? path : compilePath(path)(params);
};

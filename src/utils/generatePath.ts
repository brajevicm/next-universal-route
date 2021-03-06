import { PathFunction, compile } from 'path-to-regexp';

import { mapValues } from './mapValues';

type StringMap = {
  [key: string]: PathFunction;
};

const cache: StringMap = {};

const compilePath = (path: string) => {
  if (cache[path]) {
    return cache[path];
  }

  const generator: PathFunction = compile(path);
  cache[path] = generator;

  return generator;
};

export const generatePath = (path: string = '/', params: object = {}) => {
  const safeParams = mapValues(params, (p) =>
    typeof p === 'undefined' || p === null || p === '' ? '_' : p
  );

  return path === '/' ? path : compilePath(path)(safeParams);
};

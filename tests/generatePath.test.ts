import { generatePath } from '../src/utils/generatePath';

test('should generate path according to passed params', () => {
  const path = '/page/:a/:b/:c';
  const params = { a: 'a', b: 'b', c: 'c' };

  const generatedPath = generatePath(path, params);
  expect(generatedPath).toBe('/page/a/b/c');
});

test('should generate path with just slash', () => {
  const path = '/';

  const generatedPath = generatePath(path);
  const generatedPath2 = generatePath(path);
  expect(generatedPath).toBe('/');
  expect(generatedPath2).toBe('/');
});

test('should generate path according to passed params with numbers', () => {
  const path = '/page/:a/:b/:c';
  const params = { a: '1', b: 2, c: 'c' };

  const generatedPath = generatePath(path, params);
  expect(generatedPath).toBe('/page/1/2/c');
});

test('should generate path with undefined values', () => {
  const path = '/page/:a/:b/:c';
  const params = { a: '1', b: undefined, c: undefined };

  const generatedPath = generatePath(path, params);
  expect(generatedPath).toBe('/page/1/_/_');
});
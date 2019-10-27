const generatePath = require('../src/lib/generatePath');

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

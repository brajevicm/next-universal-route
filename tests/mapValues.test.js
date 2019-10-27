const mapValues = require('../src/lib/mapValues');

test('should map values', () => {
  const obj = { a: 1, b: 2 };
  const mappedObj = mapValues(obj, v => v * 2);
  expect(mappedObj).toMatchObject({ a: 2, b: 4 });
});

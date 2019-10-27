const isFunction = require('../src/lib/isFunction');

test('should be function', () => {
  const fn = () => {};

  expect(isFunction(fn)).toBeTruthy();
});

test('should note be function', () => {
  const fn = null;

  expect(isFunction(fn)).toBeFalsy();
});

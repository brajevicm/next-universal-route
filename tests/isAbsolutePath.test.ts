import isAbsolutePath from '../src/lib/isAbsolutePath';

test('should be absolute path', () => {
  const a = 'http://example.com';
  const b = 'HTTP://EXAMPLE.COM';
  const c = 'https://www.exmaple.com';
  const d = 'ftp://example.com/file.txt';
  const e = '//cdn.example.com/lib.js';

  expect(isAbsolutePath(a)).toBeTruthy();
  expect(isAbsolutePath(b)).toBeTruthy();
  expect(isAbsolutePath(c)).toBeTruthy();
  expect(isAbsolutePath(d)).toBeTruthy();
  expect(isAbsolutePath(e)).toBeTruthy();
});

test('should not be absolute path', () => {
  const a = '/myfolder/test.txt';
  const b = '/myfolder/:id';
  const c = 'test';

  expect(isAbsolutePath(a)).toBeFalsy();
  expect(isAbsolutePath(b)).toBeFalsy();
  expect(isAbsolutePath(c)).toBeFalsy();
});

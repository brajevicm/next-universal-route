import { formatUrl } from '../src/lib/util/formatUrl';

test('should trim both whitespace and non-alphanumeric character', () => {
  const string = '!abc ';
  const urlfiedString = formatUrl(string);
  expect(urlfiedString).toBe('abc');
});

test('should replace whitespace with hyphen', () => {
  const string = 'a b c';
  const urlfiedString = formatUrl(string);
  expect(urlfiedString).toBe('a-b-c');
});

test('should replace non-alphanumeric character with hyphen', () => {
  const string = 'a#b!c';
  const urlfiedString = formatUrl(string);
  expect(urlfiedString).toBe('a-b-c');
});

test('should transform to lower case', () => {
  const string = 'ABC';
  const urlfiedString = formatUrl(string);
  expect(urlfiedString).toBe('abc');
});

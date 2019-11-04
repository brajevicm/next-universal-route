import { formatUrl } from '../src/lib/formatUrl';

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

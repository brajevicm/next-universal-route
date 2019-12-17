import { omitFalsyValues } from '../src/utils/omitFalsyValues';

test('should omit all falsy values', () => {
  const objectWithFalsyValues = {
    a: '',
    b: 1,
    c: 0,
    d: undefined,
    e: 13,
    f: null,
    x: 'asdas'
  };

  const objectWithoutFalsyValues = omitFalsyValues(objectWithFalsyValues);

  expect(objectWithoutFalsyValues).toMatchObject({ b: 1, e: 13, x: 'asdas' });
});

import { Router } from '../src/lib/Router';
import NextRouter from 'next/router';

test('should have all methods', () => {
  expect(JSON.stringify(Router)).toEqual(JSON.stringify(NextRouter));
});

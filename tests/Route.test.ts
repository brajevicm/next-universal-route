import { Route } from '../src/lib/Route';
import { stringify } from 'querystring';

test('should construct NextRoute', () => {
  const testRoute = new Route('/', 'index');
  expect(testRoute).toBeDefined();
  expect(testRoute.path).toBe('/');
  expect(testRoute.page).toBe('/index');
});

test('should generate url without encoding querystring', () => {
  const testRoute = new Route('/', 'index');
  const returnUrl = Buffer.from('/prijava').toString('base64');
  const nextRoute = testRoute.generateUrl({}, { returnUrl }, { encode: false });
  expect(returnUrl).toBe('L3ByaWphdmE=');
  expect(nextRoute.toAs()).toBe('/?returnUrl=L3ByaWphdmE=');
});

test('should get path-to-regexp path', () => {
  const testRoute = new Route('/test/:a', 'test');

  expect(testRoute.path).toBe('/test/:a');
});

test('should format params', () => {
  const testRoute = new Route('/test/:a', 'test');
  const nextRoute = testRoute.generateUrl({ a: 'A' }, { id: 'ID' });

  expect(nextRoute.params).toMatchObject({ a: 'A' });
  expect(nextRoute.queryStringParams).toMatchObject({ id: 'ID' });
});

test('should format params with custom function', () => {
  const formatter = (string: string) => string.toUpperCase();
  const testRoute = new Route('/test/:a', 'test', formatter);
  const nextRoute = testRoute.generateUrl({ a: 'a' }, { id: 1 });

  expect(nextRoute.params).toMatchObject({ a: 'A' });
  expect(nextRoute.queryStringParams).toMatchObject({ id: 1 });
  expect(nextRoute.toAs()).toBe('/test/A?id=1');
  expect(nextRoute.toHref()).toBe('/test?a=A&id=1');
});

test('should generate proper as and href with params and qs', () => {
  const testRoute = new Route('/test/:a', 'test');
  const nextRoute = testRoute.generateUrl({ a: 'A' }, { id: 'ID' });

  expect(nextRoute.toAs()).toBe('/test/A?id=ID');
  expect(nextRoute.toHref()).toBe('/test?a=A&id=ID');
});

test('should generate proper as and href without params and qs', () => {
  const testRoute = new Route('/test', 'test');
  const nextRoute = testRoute.generateUrl();

  expect(nextRoute.toAs()).toBe('/test');
  expect(nextRoute.toHref()).toBe('/test');
});

test('should generate proper as and href with additional queryString params on page', () => {
  const testRoute = new Route('/test', 'test?a=b');
  const nextRoute = testRoute.generateUrl();

  expect(nextRoute.toAs()).toBe('/test');
  expect(nextRoute.toHref()).toBe('/test?a=b');
});

test('should generate href with absolute path', () => {
  const externalHttpsRoute = new Route('https://www.github.com');
  const externalHttpRoute = new Route('http://github.com');

  expect(externalHttpsRoute.generateUrl().toHref()).toBe(
    'https://www.github.com'
  );
  expect(externalHttpsRoute.generateUrl().toAs()).toBe(
    'https://www.github.com'
  );
  expect(externalHttpRoute.generateUrl().toHref()).toBe('http://github.com');
  expect(externalHttpRoute.generateUrl().toAs()).toBe('http://github.com');
});

test('should generate href with absolute path and query params', () => {
  const externalHttpsRoute = new Route('https://www.github.com');
  const externalHttpsRoute2 = new Route('https://www.github.com/endpoint');
  const externalHttpsRoute3 = new Route('https://www.github.com/endpoint?a=b');

  expect(
    externalHttpsRoute.generateUrl({}, { first: 1, second: 2 }).toAs()
  ).toBe('https://www.github.com?first=1&second=2');

  expect(
    externalHttpsRoute.generateUrl({}, { first: 1, second: 2 }).toHref()
  ).toBe('https://www.github.com?first=1&second=2');

  expect(
    externalHttpsRoute2.generateUrl({}, { first: 1, second: 2 }).toHref()
  ).toBe('https://www.github.com/endpoint?first=1&second=2');

  expect(
    externalHttpsRoute3.generateUrl({}, { first: 1, second: 2 }).toHref()
  ).toBe('https://www.github.com/endpoint?a=b&first=1&second=2');
});

test('should generate route from passed url', () => {
  const testRoute = new Route('/:first/:second', 'test?tab=first');
  const nextRoute = testRoute.generateFromUrl('/milos/brajevic?foo=bar', {
    page: 2,
    size: '',
  });

  expect(nextRoute.toAs()).toBe('/milos/brajevic?foo=bar&page=2');
  expect(nextRoute.toHref()).toBe(
    '/test?tab=first&first=milos&second=brajevic&foo=bar&page=2'
  );
});

test('should generate route with passed subdomain', () => {
  const testRoute = new Route('/test', 'test').addSubdomain('m');

  expect(testRoute.hasSubdomain('m')).toBe(true);
  expect(testRoute).toBeInstanceOf(Route);
});

test('should assign a hack value to prevent exceptions', () => {
  const testRoute = new Route('/test/:a', 'test');
  const nextRoute = testRoute.generateUrl({ a: '' }, { id: 'ID' });

  expect(nextRoute.params).toMatchObject({ a: '' });
  expect(nextRoute.queryStringParams).toMatchObject({ id: 'ID' });
  expect(nextRoute.toAs()).toBe('/test/_?id=ID');
});

// test('benchmark', () => {
//   const testRoute = new Route('/:a/:b/:c/:d/:e', 'test');
//   const start = Date.now();
//
//   for (let i = 0; i < 362; i++) {
//     const a = testRoute.generateUrl(
//       {
//         a: 'lorem',
//         b: 'dleor',
//         c: 1,
//         d: 'au2100-dsa1',
//         e: Math.random() * 100
//       },
//       { kind: 'goods' }
//     );
//     a.toAs();
//     a.toHref();
//   }
//
//   const end = Date.now();
//   const elapsed = end - start;
//   const difference = new Date(elapsed);
//
//   const diffMs = difference.getMilliseconds();
//
//   const generateQueryString = (params = {}) => {
//     const qs = stringify(params);
//     return qs ? `?${qs}` : qs;
//   };
//
//   const generateHomeRoute = ({ a, b, c, d, e }, params = {}) => {
//     const qs = { ...params, kind: 'goods' };
//     return `/${a}/${b}/${c}/${d}/${e}/${generateQueryString(qs)}`;
//   };
//   const start2 = Date.now();
//   for (let i = 0; i < 362; i++) {
//     generateHomeRoute(
//       {
//         a: 'lorem',
//         b: 'dleor',
//         c: 1,
//         d: 'au2100-dsa1',
//         e: Math.random() * 100
//       },
//       { kind: 'goods' }
//     );
//   }
//   const end2 = Date.now();
//   const elapsed2 = end2 - start2;
//   const difference2 = new Date(elapsed2);
//   const diffMs2 = difference2.getMilliseconds();
//
//   console.log('benchmark', diffMs, diffMs2);
//   expect(true).toBe(true);
// });

import { Routes } from './../src/Routes';
import { Route } from '../src/Route';

test('should construct NextRoute', () => {
  const testRoute = new Route('/', 'index');
  expect(testRoute).toBeDefined();
  expect(testRoute.path).toBe('/');
  expect(testRoute.page).toBe('/index');
});

test('should get path-to-regexp path', () => {
  const testRoute = new Route('/test/:a', 'test');

  expect(testRoute.path).toBe('/test/:a');
});

test('should generate cloned object', () => {
  const testRoute = new Route('/test/:a', 'test');
  const testRouteA = testRoute.generateUrl({ a: 'a' });
  const testRouteB = testRoute.generateUrl({ a: 'b' });
  const testRouteC = testRoute.generateUrl({ a: 'c' });

  expect(testRouteA).not.toBe(testRouteB);
  expect(testRouteA).not.toBe(testRouteC);
  expect(testRouteB).not.toBe(testRouteC);
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

test('should generate route from passed url', () => {
  const testRoute = new Route('/:first/:second', 'test?tab=first');
  const nextRoute = testRoute.generateFromUrl('/milos/brajevic?foo=bar', {
    page: 2
  });

  expect(nextRoute.toAs()).toBe('/milos/brajevic?foo=bar&page=2');
  expect(nextRoute.toHref()).toBe(
    '/test?tab=first&first=milos&second=brajevic&foo=bar&page=2'
  );
});

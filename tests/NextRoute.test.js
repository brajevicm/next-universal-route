const NextRoute = require('../src/NextRoute');

test('should construct NextRoute', () => {
  const testRoute = new NextRoute('/test', 'test');
  expect(testRoute).toBeDefined();
  expect(testRoute.path).toBe('/test');
  expect(testRoute.page).toBe('test');
});

test('should get path-to-regexp path', () => {
  const testRoute = new NextRoute('/test/:a', 'test');

  expect(testRoute.path).toBe('/test/:a');
});

test('should generate cloned object', () => {
  const testRoute = new NextRoute('/test/:a', 'test');
  const testRouteA = testRoute.generateUrl({ a: 'a' });
  const testRouteB = testRoute.generateUrl({ a: 'b' });
  const testRouteC = testRoute.generateUrl({ a: 'c' });

  expect(testRouteA).toBeInstanceOf(NextRoute);
  expect(testRouteB).toBeInstanceOf(NextRoute);
  expect(testRouteC).toBeInstanceOf(NextRoute);

  expect(testRouteA).not.toBe(testRouteB);
  expect(testRouteA).not.toBe(testRouteC);
  expect(testRouteB).not.toBe(testRouteC);
});

test('should format params', () => {
  const testRoute = new NextRoute('/test/:a', 'test');
  testRoute.generateUrl({ a: 'A' }, { id: 'ID' });

  expect(testRoute.params).toMatchObject({ a: 'a' });
  expect(testRoute.queryStringParams).toMatchObject({ id: 'id' });
});

test('should generate proper as and href with params and qs', () => {
  const testRoute = new NextRoute('/test/:a', 'test');
  testRoute.generateUrl({ a: 'A' }, { id: 'ID' });

  expect(testRoute.toAs()).toBe('/test/a?id=id');
  expect(testRoute.toHref()).toBe('test?a=a&id=id');
});

test('should generate proper as and href without params and qs', () => {
  const testRoute = new NextRoute('/test', 'test');
  testRoute.generateUrl();

  expect(testRoute.toAs()).toBe('/test');
  expect(testRoute.toHref()).toBe('test');
});

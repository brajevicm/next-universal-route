import { Routes } from './../src/Routes';
import { Route } from './../src/Route';

test('should match route from passed url', () => {
  const testRoute = new Route('/:first/:second', 'test?tab=first');
  const routes = new Routes({ testRoute });
  const url = '/milos/brajevic?foo=bar';
  const nextRoute = routes.getRoute(url);

  expect(nextRoute.path).toBe('/:first/:second');
  expect(nextRoute.page).toBe('/test');
  expect(nextRoute.query).toMatchObject({
    first: 'milos',
    second: 'brajevic',
    foo: 'bar',
    tab: 'first'
  });
});

test('should not match route from passed url', () => {
  const testRoute = new Route('/:first/:second/:third', 'test?tab=first');
  const testRoute2 = new Route('/:first', 'test?tab=first');
  const routes = new Routes({ testRoute, testRoute2 });
  const url = '/milos/brajevic?foo=bar';
  const nextRoute = routes.getRoute(url);

  expect(nextRoute).toBeFalsy();
});

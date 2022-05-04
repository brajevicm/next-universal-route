import { getRequestHandler, Route } from '../src';

test('should match route', () => {
  const indexRoute = new Route('/');
  const usersRoute = new Route('/users/:id');
  const routes = {
    indexRoute,
    usersRoute,
  };

  const app = {
    getRequestHandler: jest.fn(() => () => true),
    render: jest.fn(() => true),
  };

  const handler = getRequestHandler(app, routes);
  handler({ url: '/' }, {});
  handler({ url: '/users/1' }, {});
  handler({ url: '/about-us' }, {});
  expect(app.render).toHaveBeenCalledTimes(2);
  expect(app.getRequestHandler).toHaveBeenCalledTimes(1);
});

import { getRequestHandler, Route } from '../src';
import { formatUrl } from '../src/utils/formatUrl';

const prepareApp = () => ({
  getRequestHandler: jest.fn(() => () => true),
  render: jest.fn(() => true),
});

test('should match route', () => {
  const indexRoute = new Route('/');
  const usersRoute = new Route('/users/:id');
  const routes = {
    indexRoute,
    usersRoute,
  };

  const app = prepareApp();

  const handler = getRequestHandler(app, routes);
  handler({ url: '/' }, {});
  handler({ url: '/users/1' }, {});
  handler({ url: '/about-us' }, {});
  expect(app.render).toHaveBeenCalledTimes(2);
  expect(app.getRequestHandler).toHaveBeenCalledTimes(1);
});

test('should match route with subdomain', () => {
  const indexRoute = new Route('/', 'index').addSubdomain('m');
  const routes = {
    indexRoute,
  };

  const app = prepareApp();

  const req = { url: '/', subdomains: ['m'] };
  const res = {};

  const handler = getRequestHandler(app, routes, { subdomain: 'm' });
  handler(req, res);
  expect(app.render).toHaveBeenCalledTimes(1);
  expect(app.render).toHaveBeenCalledWith(req, res, '/m/index', {});
});

test('should match route with custom handler', () => {
  const customHandler = jest.fn();
  const indexRoute = new Route('/', '', formatUrl, customHandler);
  const routes = {
    indexRoute,
  };

  const app = prepareApp();

  const req = { url: '/' };
  const res = {};

  const handler = getRequestHandler(app, routes);
  handler(req, res);
  expect(customHandler).toHaveBeenCalledTimes(1);
});

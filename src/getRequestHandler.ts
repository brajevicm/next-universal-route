import { Route } from './Route';

class Router {
  private routes: Route[];

  constructor(routes) {
    this.routes = Object.values(routes);
  }

  public getRoute(url: string) {
    return this.routes.filter(route => route.isMatch(url))[0];
  }
}

export const getRequestHandler = (app, routes) => {
  const nextHandler = app.getRequestHandler();
  const router = new Router(routes);

  return (req, res) => {
    const route = router.getRoute(req.url);

    if (route) {
      app.render(req, res, route.page, route.query);
    } else {
      nextHandler(req, res, req.url);
    }
  };
};

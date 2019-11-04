import { Routes } from './Routes';

export const getRequestHandler = (app, routes) => {
  const nextHandler = app.getRequestHandler();
  const router = new Routes(routes);

  return (req, res) => {
    const route = router.getRoute(req.url);

    if (route) {
      app.render(req, res, route.page, route.query);
    } else {
      nextHandler(req, res, req.url);
    }
  };
};

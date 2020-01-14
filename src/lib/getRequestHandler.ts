import { Routes } from './Routes';

type HandlerOptions = {
  subdomain: string;
};

export const getRequestHandler = (app, routes, options?: HandlerOptions) => {
  const nextHandler = app.getRequestHandler();
  const router = new Routes(routes);

  return (req, res) => {
    const route = router.getRoute(req.url);

    if (route) {
      if (options && options.subdomain) {
        const isSubdomain = req.subdomains.indexOf(options.subdomain) > -1;

        if (isSubdomain && route.hasSubdomain(options.subdomain)) {
          app.render(req, res, `/m${route.page}`, route.query);
        }
      }

      app.render(req, res, route.page, route.query);
    } else {
      nextHandler(req, res, req.url);
    }
  };
};

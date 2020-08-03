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
      // console.log(route)
      const customHandler = route.getCustomHandler(app);
      let page = route.page;

      if (options && options.subdomain) {
        const isSubdomain = req.subdomains.indexOf(options.subdomain) > -1;

        if (isSubdomain && route.hasSubdomain(options.subdomain)) {
          page = `/${options.subdomain}${route.page}`;
        }
      }

      if (customHandler) {
        customHandler(req, res, page, route.query);
      } else {
        app.render(req, res, page, route.query);
      }
    } else {
      nextHandler(req, res, req.url);
    }
  };
};

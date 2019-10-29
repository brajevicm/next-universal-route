import NextRouter, { NextRouter as NextRouterType } from 'next/router';

/**
 * Modified original code by @fridays/next-routes
 */
export const Router = ((router: NextRouterType) => {
  const wrapFull = method => (href, options) => {
    return router[method](href.toHref(), href.toAs(), options);
  };

  const wrapHref = method => href => {
    return router[method](href.toHref());
  };

  router.push = wrapFull('push');
  router.replace = wrapFull('replace');
  router.prefetch = wrapHref('prefetch');

  return router;
})(NextRouter);

import NextRouter, { NextRouter as NextRouterType } from 'next/router';

import { NextRoute } from './NextRoute';
import { clone } from './util/deepClone';

export const Router = ((router: NextRouterType) => {
  const newRouter = clone(router);

  newRouter.push = (href: NextRoute, options?: object) =>
    router.push(href.toHref(), href.toAs(), options);

  newRouter.prefetch = (href: NextRoute) => router.prefetch(href.toHref());

  newRouter.replace = (href: NextRoute, options?: object) =>
    router.replace(href.toHref(), href.toAs(), options);

  return newRouter;
})(NextRouter);

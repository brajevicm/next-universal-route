import NextRouter, { NextRouter as NextRouterType } from 'next/router';

import { NextRoute } from './NextRoute';
// import { clone } from './lib/deepClone';

// TODO: Find the way to replace Next's Router completely
// const ClonedRouter = ((router: NextRouterType) => {
//   const newRouter = clone(router);

//   newRouter.push = (href: NextRoute, options?: object) =>
//     router.push(href.toHref(), href.toAs(), options);

//   newRouter.prefetch = (href: NextRoute) => router.prefetch(href.toHref());

//   newRouter.replace = (href: NextRoute, options?: object) =>
//     router.replace(href.toHref(), href.toAs(), options);

//   return newRouter;
// })(NextRouter);

export const Router = ((router: NextRouterType) => {
  const push = (href: NextRoute, options?: object) =>
    router.push(href.toHref(), href.toAs(), options);

  const prefetch = (href: NextRoute) => router.prefetch(href.toHref());

  const replace = (href: NextRoute, options?: object) =>
    router.replace(href.toHref(), href.toAs(), options);

  return {
    push,
    prefetch,
    replace
  };
})(NextRouter);

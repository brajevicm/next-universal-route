import NextRouter, { NextRouter as NextRouterType } from 'next/router';

import { NextRoute } from './NextRoute';

export const Router = ((router: NextRouterType) => {
  const push = (href: NextRoute, options?: object) =>
    router.push(href.toHref(), href.toAs(), options);

  const replace = (href: NextRoute, options?: object) =>
    router.replace(href.toHref(), href.toAs(), options);

  const prefetch = (href: NextRoute) => router.prefetch(href.toHref());

  return {
    push,
    replace,
    prefetch
  };
})(NextRouter);

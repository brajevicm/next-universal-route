import NextRouter, { NextRouter as NextRouterType } from 'next/router';

import { Route } from './Route';
import { NextRoute } from './NextRoute';
import { isAbsolutePath } from '../utils/isAbsolutePath';

export const Router = ((router: NextRouterType) => {
  const push = (href: NextRoute, options?: object) => {
    const newHref = typeof href === 'string' ? href : href.toHref();

    if (typeof href === 'string' || isAbsolutePath(href.path)) {
      return (window.location.href = newHref);
    }

    return router.push(href.toHref(), href.toAs(), options);
  };

  const prefetch = (href: NextRoute) => router.prefetch(href.toHref());

  const replace = (href: NextRoute, options?: object) =>
    router.replace(href.toHref(), href.toAs(), options);

  const update = (href: Route, params: object) =>
    push(
      href.generateFromUrl(
        `${window.location.pathname}${window.location.search}`,
        params
      )
    );

  return {
    push,
    prefetch,
    replace,
    update,
  };
})(NextRouter);

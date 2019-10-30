import React from 'react';
import NextLink from 'next/link';

import { NextRoute } from './NextRoute';

type LinkProps = {
  href: NextRoute;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
};

export const Link = (props: LinkProps) => {
  const { href, ...rest } = props;

  if (href.isAbsolutePath) {
    return <a href={href.toHref()} {...rest} />;
  }

  return <NextLink href={href.toHref()} as={href.toAs()} {...rest} />;
};

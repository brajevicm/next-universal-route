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
  return <NextLink href={href.toHref()} as={href.toAs()} {...rest} />;
};

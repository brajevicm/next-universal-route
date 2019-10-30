import React, { Children, ReactChildren } from 'react';
import NextLink from 'next/link';

import { NextRoute } from './NextRoute';

type LinkProps = {
  href: NextRoute;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  children?: ReactChildren;
};

export const Link = (props: LinkProps) => {
  const { href, ...rest } = props;

  if (href.isAbsolutePath) {
    const child: any = Children.only(props.children);

    if (props.passHref || (child.type === 'a' && !('href' in child.props))) {
      const { children, ...newRest } = rest;
      return <a href={href.toHref()} {...newRest} />;
    }
  }

  return <NextLink href={href.toHref()} as={href.toAs()} {...rest} />;
};

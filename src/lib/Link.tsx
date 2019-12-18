import React, { Children, ReactNode } from 'react';
import NextLink from 'next/link';

import { NextRoute } from './NextRoute';

type LinkProps = {
  href: NextRoute | string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  children?: ReactNode;
};

export const Link = (props: LinkProps) => {
  const { href, ...rest } = props;
  const newHref = typeof href === 'string' ? href : href.toHref();

  if (typeof href === 'string' || href.isAbsolutePath) {
    const child: any = Children.only(props.children);
    const { children, ...newRest } = rest;

    if (props.passHref || (child.type === 'a' && !('href' in child.props))) {
      return React.cloneElement(child, { href: newHref, ...newRest });
    }

    return (
      <a href={newHref} {...newRest}>
        {children}
      </a>
    );
  }

  return <NextLink href={href.toHref()} as={href.toAs()} {...rest} />;
};

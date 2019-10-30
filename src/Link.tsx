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
    const { children, ...newRest } = rest;

    if (props.passHref || (child.type === 'a' && !('href' in child.props))) {
      return React.cloneElement(child, { href: href.toHref(), ...newRest });
    }

    return (
      <a href={href.toHref()} {...newRest}>
        {children}
      </a>
    );
  }

  return <NextLink href={href.toHref()} as={href.toAs()} {...rest} />;
};

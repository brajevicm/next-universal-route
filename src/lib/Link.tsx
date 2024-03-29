import React, { Children, ReactNode } from 'react';
import NextLink from 'next/link';

import { NextRoute } from './NextRoute';
import { isAbsolutePath } from '../utils/isAbsolutePath';

type LinkProps = {
  href: NextRoute | string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  children?: ReactNode;
  onClick?: Function;
};

export const Link = (props: LinkProps) => {
  const { href, onClick, ...rest } = props;
  const newHref = typeof href === 'string' ? href : href.toHref();

  if (typeof href === 'string' || isAbsolutePath(href.path)) {
    const child: any = Children.only(props.children);
    const { children, ...newRest } = rest;

    if (props.passHref || (child.type === 'a' && !('href' in child.props))) {
      const { prefetch, ...restWithoutPrefetch } = newRest;
      return React.cloneElement(child, {
        href: newHref,
        ...restWithoutPrefetch,
      });
    }

    return (
      <a href={newHref} {...newRest}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return <a href="javascript:void(0)" {...rest} />;
  }

  return <NextLink href={href.toHref()} as={href.toAs()} {...rest} />;
};

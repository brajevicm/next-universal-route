import React from 'react';
import NextLink from 'next/link';

const Link = props => {
  const { href, as, ...newProps } = props;
  return <NextLink href={href.toHref()} as={href.toAs()} {...newProps} />;
};

export default Link;

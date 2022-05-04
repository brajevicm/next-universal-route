import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Link, Route } from '../src';
import userEvent from '@testing-library/user-event';

test('should render Link with absolute path', () => {
  const path = 'https://www.github.com';
  const route = new Route(path);
  const nextRoute = route.generateUrl();

  render(
    <Link href={nextRoute}>
      <a>Link</a>
    </Link>
  );

  expect(screen.getByText(/link/i)).toHaveAttribute('href', path);
});

test('should render Link with absolute path and query params', () => {
  const path = 'https://www.github.com';
  const route = new Route(path);
  const nextRoute = route.generateUrl({ id: 123 });

  render(
    <Link href={nextRoute}>
      <a>Link</a>
    </Link>
  );

  expect(screen.getByText(/link/i)).toHaveAttribute('href', `${path}?id=123`);
});

test('should render Link with relative path and query params', () => {
  const path = '/users/:id';
  const route = new Route(path);
  const nextRoute = route.generateUrl({ id: 123 }, { from: 'github' });

  render(
    <Link href={nextRoute}>
      <a>Link</a>
    </Link>
  );

  expect(screen.getByText(/link/i)).toHaveAttribute(
    'href',
    '/users/123?from=github'
  );
});

// test('should render Link with onClick handler', async () => {
//   const path = '/users/:id';
//   const route = new Route(path);
//   const nextRoute = route.generateUrl({ id: 123 }, { from: 'github' });
//
//   const handleClick = jest.fn();
//
//   render(
//     <Link href={nextRoute} onClick={handleClick}>
//       <a>Link</a>
//     </Link>
//   );
//   screen.debug();
//   await userEvent.click(screen.getByText(/link/i));
//   expect(handleClick).toHaveBeenCalledTimes(1);
// });

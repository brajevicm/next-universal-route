# Universal Next.js Route

Static, dynamic and absolute routes generator for Next.js. Define routes once and re-use them everywhere without hassle. 

Comes with Link and Router replacements.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/next-universal-route) ![npm](https://img.shields.io/npm/dt/next-universal-route) ![npm](https://img.shields.io/npm/v/next-universal-route) ![Travis (.org)](https://img.shields.io/travis/brajevicm/next-universal-route) ![Codecov](https://img.shields.io/codecov/c/gh/brajevicm/next-universal-route)

## Installation
```
$ npm install next-universal-route
```
```
$ yarn install next-universal-route
```

## Features

- [x] Concise, DRY routes
- [x] Two-way, works on both client and server
- [x] Static and dynamic paths (using path-to-regexp)
- [x] Absolute paths
- [x] Pass invisible params to every page (support for tabs)
- [x] Next.js Link replacement
- [x] Next.js Router replacement (push, prefetch, replace, <b>update</b>)
- [x] Partial <b>update</b> to query params
- [x] Opt-in routing system (via middleware)
- [ ] Full Next.js Router replacement
- [x] Custom params and query string formatting

## Usage

#### Route creation

```js
// routes.js
const Route = require('next-universal-route');

const IndexRoute = new Route('/', 'index');

module.exports = {
  IndexRoute
}
```

#### Using Middleware on server side

```js
// server.js
const express = require('express');
const next = require('next');
const getRequestHandler = require('next-universal-route/handler');

const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = getRequestHandler(app, routes);

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(3000);
});
```

#### Using Next.js Link Component
```js
// pages/index.js
import React from 'react';
import Link from 'next/link';
import { IndexRoute } from '../routes';

const LinkWrapper = ({ href, children }) => (
  <Link href={href.toHref()} as={href.toAs()}>
    <a>{children}</a>
  </Link>
);

export default () => (
  <div>
    <LinkWrapper href={IndexRoute.generateUrl()}>
      Go to Index Page
    </LinkWrapper>
  </div>
)

```

#### Using Universal Next.js Route's Link Component
```js
// pages/index.js
import React from 'react';
import Link from 'next-universal-route/link';
import { IndexRoute } from '../routes';

export default () => (
  <Link href={IndexRoute.generateUrl()}>
    Go to index page
  </Link>
);
```

## API Docs

### Route

#### **`Route.constructor(path: string, page?: string, urlFormatter?: Function): Route`**

```js
const IndexRoute = new Route('/', 'index');
const PostsRoute = new Route('/posts/:id/:slug', 'posts', string => str.toUpperCase());
const GithubRoute = new Route('https://github.com');
```

#### **`Route.path: string`** 

```js
IndexRoute.path // => '/'
PostsRoute.path // => '/posts/:id/:slug'
GithubRoute.path // => 'https://github.com'
```

#### **`Route.page: string`**

```js
IndexRoute.page // => '/index'
PostsRoute.page // => '/posts'
GithubRoute.page // => null
```

#### **`Route.generateUrl(params?: object, queryStringParams?: object): NextRoute`**

```js
IndexRoute.generateUrl();
PostsRoute.generateUrl({ id: 1, slug: 'first-post' }, { page: 1 });
GithubRoute.generateUrl();
```

#### **`NextRoute.toAs(): string`**

```js
IndexRoute.toAs(); // => '/'
PostsRoute.toAs(); // => '/posts/1/FIRST-POST?page=1'
GithubRoute.toAs(); // =? 'https://github.com'
```
#### **`NextRoute.toHref(): string`**

```js
IndexRoute.toHref(); // => '/index'
PostsRoute.toHref(); // => '/posts?id=1&slug=FIRST-POST&page=1'
GithubRoute.toHref(); // => 'https://github.com'
```

### Router

#### **`Router.push(href: NextRoute, options?: object)`**

#### **`Router.prefetch(href: NextRoute)`**

#### **`Router.replace(href: NextRoute, options?: object)`**

#### **`Router.update(href: Route, params: object)`**

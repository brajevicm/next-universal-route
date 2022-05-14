# Universal Next.js Route

The drop-in replacement for everything routing wise in Next.js.

![npm](https://img.shields.io/npm/v/next-universal-route) ![npm](https://img.shields.io/npm/dt/next-universal-route) ![Travis (.org)](https://img.shields.io/travis/brajevicm/next-universal-route) ![Codecov](https://img.shields.io/codecov/c/gh/brajevicm/next-universal-route)

# Features

- [x] Declaration of DRY and concise routes
- [x] Two-way usage, works on both client and server
- [x] Absolute, static and dynamic paths (using path-to-regexp)
- [x] Opt-in routing system (via middleware)
- [x] Next.js Router replacement
- [x] Next.js Link replacement

# Installation

```
$ npm install next-universal-route
```

or

```
$ yarn add next-universal-route
```

# Usage

[![Edit next-universal-route-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/next-universal-route-ko4w8?fontsize=14)

For fully featured demo check CodeSandbox or to get a quick peek take a look at example below.

### Server-Side

```js
// routes.js
const { Route } = require('next-universal-route');

const IndexRoute = new Route('/', 'index');
const PostRoute = new Route('/posts/:id/:slug', 'post');
const GitHubRoute = new Route('https://www.github.com');

module.exports = {
  IndexRoute,
  PostRoute,
  GitHubRoute,
};

// server.js
const express = require('express');
const next = require('next');
const { getRequestHandler } = require('next-universal-route');

const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = getRequestHandler(app, routes);

app.prepare().then(() => {
  express().use(handler).listen(3000);
});
```

### Client-Side

```js
// pages/index.js
import { Link } from 'next-universal-route';

import { IndexRoute, PostRoute, GitHub } from '../routes';

<Link href={IndexRoute.generateUrl()}>
  <a>Index</a>
</Link>

<Link href={PostRoute.generateUrl({ id: 1, slug: 'first-post' })}>
  <a>Post</a>
</Link>

<Link href={GitHubRoute.generateUrl()}>
  <a>GitHub</a>
</Link>
```

When using a custom server with a server file, for example called `server.js`, make sure you update the scripts key in `package.json` to:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

&nbsp;

# API Docs

### Route

#### **`Route.constructor(path: string, page?: string, urlFormatter?: Function, customHandler?: Function): Route`**

Instantiates a Route object to be used throughout the application.

- To create the route with absolute path, it needs to start with `http`

  - page can/should be ommited as it won't be used
  - urlFormatter can be ommited as it won't work on absolute paths

- To create SPA friendly routes you have to pass relative paths.
  - path either be static or dynamic (using path-to-regexp)
  - page is required and it should correspond to page in `pages/`
    - it's possible to pass extra params using query strings syntax which can be accessed inside your page, but won't be shown to your user
  - urlFormatter is optional and it takes a function which will run on every given parameter when `Route.generateUrl` is called
  - customHandler is optional and takes same arguments as the Next.js's app.render functions

#### **`Route.generateUrl(params?: object, queryStringParams?: object): NextRoute`**

Generates a NextRoute object which is used for client-side routing. It will generate both `href` and `as` via `toHref` and `toAs` methods.

- If using static routes, `Route.generateUrl` can be called without any arguments
- If generating dynamic routes you'll have to pass params and optionally queryStringParams
  - params is the object which corresponds to path-to-regexp params
  - queryStringparams is the object with query string key/values pairs

&nbsp;

#### If not using Universal Next.js Route's Link

#### **`NextRoute.toAs(): string`**

Generates `as` prop to pass to Next.js's Link Component.

#### **`NextRoute.toHref(): string`**

Generates `href` prop to pass to Next.js's Link Component.

#### If not using Universal Next.js Route's Middleware Handler

#### **`Route.path: string`**

Returns path-to-regexp string for given route.

#### **`Route.page: string`**

Returns name of the page for given route.

#### **`Route.query: string`**

Returns an object which contains both params and query strings.

&nbsp;

### Router

#### **`Router.push(href: NextRoute, options?: object)`**

Wraps Next.js's `Router.push`.

#### **`Router.prefetch(href: NextRoute)`**

Wraps Next.js's `Router.prefetch`.

#### **`Router.replace(href: NextRoute, options?: object)`**

Wraps Next.js's `Router.replace`.

#### **`Router.update(href: Route, params: object)`**

Wraps Next.js's `Router.push` and updates only passed params.

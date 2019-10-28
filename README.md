#Universal Next.js Route

![npm bundle size](https://img.shields.io/bundlephobia/minzip/next-universal-route) ![npm](https://img.shields.io/npm/dt/next-universal-route) ![npm](https://img.shields.io/npm/v/next-universal-route) ![Travis (.org)](https://img.shields.io/travis/brajevicm/next-universal-route) ![Codecov](https://img.shields.io/codecov/c/gh/brajevicm/next-universal-route)

## Installation
```
$ npm install next-universal-route
```
```
$ yarn install next-universal-route
```

## Usage

#### Route creation

```js
// routes.js
const NextUniversalRoute = require('next-universal-route');

const IndexRoute = new NextUniversalRoute('/', 'index');

module.exports = {
  IndexRoute
}
```

#### Using Express.js on server side

```js
// server.js
const express = require('express');
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler();

const { IndexRoute } = require('./routes');

app.prepare().then(() => {
  const server = express();

  server.get(IndexRoute.path, (req, res) => {
    app.render(req, res, IndexRoute.page, {});
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('Server running on localhost:3000');
  });
}
```

#### Using Next.js Link Component
```js
// pages/index.js
import React from 'react';
import Link from 'next/link';
import { IndexRoute } from '../server';

const LinkWrapper = ({ route, children }) => (
  <Link href={route.toHref()} as={route.toAs()}>
    <a>{children}</a>
  </Link>
);

export default () => (
  <div>
    <LinkWrapper route={IndexRoute.generateUrl()}>Go to Index Page</LinkWrapper>
  </div>
)

```

#### Using Universal Next.js Route's Link Component
```js
// /pages/index.js
import React from 'react';
import Link from 'next-universal-route/link';
import { IndexRoute } from '../server';

export default () => (
  <Link href={IndexRoute.generateUrl()}>
    Go to index page
  </Link>
);
```

## API Docs

#### **`NextUniversalRoute.constructor(path: string, page?: string): NextUniversalRoute`**

```js
const IndexRoute = new NextUniversalRoute('/', 'index');
const PostsRoute = new NextUniversalRoute('/posts/:id/:slug', 'posts');
const GithubRoute = new NextUniversalRoute('https://github.com');
```

#### **`NextUniversalRoute.path: string`** 

```js
IndexRoute.path // => '/'
PostsRoute.path // => '/posts/:id/:slug'
GithubRoute.path // => 'https://github.com'
```

#### **`NextUniversalRoute.page: string`**

```js
IndexRoute.page // => '/index'
PostsRoute.page // => '/posts'
GithubRoute.page // => null
```

#### **`NextUniversalRoute.generateUrl(params?: object, queryStringParams?: object): NextRoute`**

```js
IndexRoute.generateUrl();
PostsRoute.generateUrl({ id: 1, slug: 'first-post' }, { page: 1 });
GithubRoute.generateUrl();
```

#### **`NextRoute.toAs(): string`**

```js
IndexRoute.toAs(); // => '/'
PostsRoute.toAs(); // => '/posts/1/first-post?page=1'
GithubRoute.toAs(); // =? 'https://github.com'
```
#### **`NextRoute.toHref(): string`**

```js
IndexRoute.toHref(); // => '/index'
PostsRoute.toHref(); // => '/posts?id=1&slug=first-post&page=1'
GithubRoute.toHref(); // => 'https://github.com'
```

# DRY Universal Next.js Routes

![npm bundle size](https://img.shields.io/bundlephobia/minzip/next-universal-route) ![npm](https://img.shields.io/npm/dt/next-universal-route) ![npm](https://img.shields.io/npm/v/next-universal-route) ![Travis (.org)](https://img.shields.io/travis/brajevicm/next-universal-route)

## Installation
```
$ npm install next-universal-route
```

## Usage

**`NextUniversalRoute.constructor(path: string, page: string): NextUniversalRoute`**

**`NextUniversalRoute.page: string`**

**`NextUniversalRoute.path: string`**

**`NextUniversalRoute.generateUrl(params: object, queryStringParams: object): NextRoute`**

**`NextRoute.toAs(): string`**

**`NextRoute.toHref(): string`**

## Examples
```js

// /server.js
const NextUniversalRoute = require('next-universal-route');
const server = require('express')();
const app = require('next')();

const IndexRoute = new NextUniversalRoute('/', 'index');

server.get(IndexRoute.path, (req, res) => {
    app.render(req, res, IndexRoute.page, {});
  });

// React Component /pages/index.js
import React from 'react';
import Link from 'next-universal-route/link';
import IndexRoute from '../server';

export default () => (
  <Link href={IndexRoute.generateUrl()}>
    Go to index page
  </Link>
);
```
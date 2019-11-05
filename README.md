# Universal Next.js Route

Static, dynamic and absolute routes generator for Next.js. Define routes once and re-use them everywhere without hassle. 

Comes with Link and Router replacements.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/next-universal-route) ![npm](https://img.shields.io/npm/dt/next-universal-route) ![npm](https://img.shields.io/npm/v/next-universal-route) ![Travis (.org)](https://img.shields.io/travis/brajevicm/next-universal-route) ![Codecov](https://img.shields.io/codecov/c/gh/brajevicm/next-universal-route)


# Installation
```
$ npm install next-universal-route
```
or
```
$ yarn install next-universal-route
```

# Demo & Examples

[![Edit next-universal-route-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/next-universal-route-ko4w8?fontsize=14)

# Features

- [x] Declaration of DRY and concise routes
- [x] Two-way usage, works on both client and server
- [x] Absolute, static and dynamic paths (using path-to-regexp)
- [x] Opt-in routing system (via middleware)
- [x] Automatic generation of both <b>href</b> and <b>as</b> urls
- [x] Next.js Router replacement
- [x] Next.js Link replacement
- [x] Pass extra params to every page (support for tabs)
- [x] Custom params and query string formatting


# API Docs

## Route

#### **`Route.constructor(path: string, page?: string, urlFormatter?: Function): Route`**


#### **`Route.path: string`** 


#### **`Route.page: string`**


#### **`Route.query: string`**


#### **`Route.generateUrl(params?: object, queryStringParams?: object): NextRoute`**


#### **`NextRoute.toAs(): string`**


#### **`NextRoute.toHref(): string`**


## Router

#### **`Router.push(href: NextRoute, options?: object)`**


#### **`Router.prefetch(href: NextRoute)`**


#### **`Router.replace(href: NextRoute, options?: object)`**


#### **`Router.update(href: Route, params: object)`**


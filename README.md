# Universal Next.js Route

Next.js is a fantastic Server-Side-Rendering framework for React, however one of the main issues community has with it is File-System based routing. 

Universal Next.jS Route strives to fix that by using Route objects for static, dynamic and absoloute paths. This library comes with custom Link, Router and middleware for creating a highly modular routing mechanism.

Full list of features and demo can be found below.

![npm](https://img.shields.io/npm/v/next-universal-route) ![npm](https://img.shields.io/npm/dt/next-universal-route) ![Travis (.org)](https://img.shields.io/travis/brajevicm/next-universal-route) ![Codecov](https://img.shields.io/codecov/c/gh/brajevicm/next-universal-route)


# Installation
```
$ npm install next-universal-route
```
or
```
$ yarn add next-universal-route
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
- [ ] Rewrites
- [ ] Redirects

&nbsp;
# API Docs

## Route

#### **`Route.constructor(path: string, page?: string, urlFormatter?: Function): Route`**
Instantiates a Route object to be used throughout the application.
- To create the route with absolute path, it needs to start with `http`
  - page can/should be ommited as it won't be used
  - urlFormatter can be ommited as it won't work on absolute paths

- To create SPA friendly routes you have to pass relative paths.
  - path either be static or dynamic (using path-to-regexp)
  - page is required and it should correspond to page in `pages/`
    - it's possible to pass extra params using query strings syntax which can be accessed inside your page, but won't be shown to your user
  - urlFormatter is optional and it takes a function which will run on every given parameter when `Route.generateUrl` is called

#### **`Route.generateUrl(params?: object, queryStringParams?: object): NextRoute`**
Generates a NextRoute object which is used for client-side routing. It will generate both `href` and `as` via `toHref` and `toAs` methods.
- If using static routes you `Route.generateUrl` can be called without any arguments
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
## Router

#### **`Router.push(href: NextRoute, options?: object)`**
Wraps Next.js's `Router.push`.

#### **`Router.prefetch(href: NextRoute)`**
Wraps Next.js's `Router.prefetch`.

#### **`Router.replace(href: NextRoute, options?: object)`**
Wraps Next.js's `Router.replace`.

#### **`Router.update(href: Route, params: object)`**
Wraps Next.js's `Router.push` and updates only passed params.
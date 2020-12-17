import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'url';
import { ServerResponse, IncomingMessage } from 'http';
import LRUCache from 'lru-cache';

import { NextRoute } from './NextRoute';
import { isFunction } from '../utils/isFunction';
import { mapValues } from '../utils/mapValues';
import { formatUrl } from '../utils/formatUrl';
import { isAbsolutePath } from '../utils/isAbsolutePath';
import { omitFalsyValues } from '../utils/omitFalsyValues';

const cache = new LRUCache({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

export class Route {
  public path: string;
  public page?: string;
  private _query: object;
  private readonly urlFormatter?: Function;
  private readonly params: object;
  private queryStringParams: object;
  private subdomains: string[] = [];
  private readonly customHandler: Function;

  constructor(
    path: string,
    page?: string,
    urlFormatter?: Function,
    customHandler?: Function
  ) {
    this.path = path;
    this.setPage(`/${page}`);
    this.urlFormatter = urlFormatter;
    this.params = {};
    this.queryStringParams = {};
    this.customHandler = customHandler;
  }

  // @ts-ignore
  get query(): object {
    return { ...this._query, ...this.queryStringParams };
  }

  public generateUrl(
    params: object = {},
    queryStringParams?: object
  ): NextRoute {
    const newParams = this.formatUrl({ ...this.params, ...params });
    const newQueryStringParams = {
      // ...this.queryStringParams,
      ...omitFalsyValues(queryStringParams),
    };
    const { path, page, _query } = this;
    const key = JSON.stringify({
      newParams,
      newQueryStringParams,
      path,
      page,
      _query,
    });

    if (cache.has(key)) {
      return <NextRoute>cache.get(key);
    }

    const route = new NextRoute(
      this.path,
      this.page,
      newParams,
      newQueryStringParams,
      this._query
    );

    // @ts-ignore
    cache.set(key, route);

    return route;
  }

  public generateFromUrl(url: string, params: object): NextRoute {
    const { pathname, query } = Route.parseUrl(url);
    const keys = [];
    const regex = pathToRegexp(this.path, keys);
    const values = regex.exec(pathname);

    const newParams = this.getQuery(values.slice(1), keys);
    const queryStringParams = {
      ...this.queryStringParams,
      ...query,
      ...params,
    };

    return this.generateUrl(newParams, queryStringParams);
  }

  public isMatch(url: string) {
    const { pathname, query } = Route.parseUrl(url);

    if (isAbsolutePath(this.path)) {
      return false;
    }

    const keys = [];
    const regex = pathToRegexp(this.path, keys);

    const isMatch = regex.test(pathname);

    if (isMatch) {
      const values = regex.exec(pathname);

      this._query = {
        ...this._query,
        ...this.getQuery(values.slice(1), keys),
      };

      this.queryStringParams = query;
    }

    return isMatch;
  }

  public hasSubdomain(subdomain: string): boolean {
    return this.subdomains.indexOf(subdomain) > -1;
  }

  public addSubdomain(subdomain: string): Route {
    this.subdomains.push(subdomain);

    return this;
  }

  public getCustomHandler(app: Function): Function {
    if (!this.customHandler) return undefined;

    return (
      req: IncomingMessage,
      res: ServerResponse,
      pathname: string,
      query: object = {}
    ) => this.customHandler(app, req, res, pathname, query);
  }

  private setPage(url: string): void {
    const { pathname, query } = Route.parseUrl(url);

    this._query = query;
    this.page = pathname;
  }

  private formatUrl(params: object): object {
    let fn: Function = formatUrl;

    if (isFunction(this.urlFormatter)) {
      fn = (string: string) => formatUrl(this.urlFormatter(string));
    }

    return mapValues(params, (param: string | number) =>
      typeof param === 'string' ? fn(param) : param
    );
  }

  private getQuery(values, keys) {
    return values.reduce((params, val, i) => {
      return {
        ...params,
        [keys[i].name]: decodeURIComponent(val),
      };
    }, {});
  }

  private static parseUrl(url: string) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;

    return {
      pathname,
      query,
    };
  }
}

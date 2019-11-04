import pathToRegexp from 'path-to-regexp';
import { parse } from 'url';

import { NextRoute } from './NextRoute';
import { isFunction } from './lib/isFunction';
import { mapValues } from './lib/mapValues';
import { formatUrl } from './lib/formatUrl';

export class Route {
  public path: string;
  public page?: string;
  private _query: object;
  private urlFormatter?: Function;
  private params: object;
  private queryStringParams: object;

  constructor(path: string, page?: string, urlFormatter?: Function) {
    this.path = path;
    this.setPage(`/${page}`);
    this.urlFormatter = urlFormatter;
    this.params = {};
    this.queryStringParams = {};
  }

  get query() {
    return { ...this._query, ...this.queryStringParams };
  }

  public generateUrl(params: object = {}, queryStringParams?: object) {
    const newParams = this.formatUrl({ ...this.params, ...params });
    const newQueryStringParams = this.formatUrl({
      ...this.queryStringParams,
      ...queryStringParams
    });

    return new NextRoute(
      this.path,
      this.page,
      newParams,
      newQueryStringParams,
      this._query
    );
  }

  public generateFromUrl(url: string, params: object): NextRoute {
    const { pathname, query } = this.parseUrl(url);
    const keys = [];
    const regex = pathToRegexp(this.path, keys);
    const values = regex.exec(pathname);

    const newParams = this.getQuery(values.slice(1), keys);
    const queryStringParams = {
      ...this.queryStringParams,
      ...query,
      ...params
    };

    return this.generateUrl(newParams, queryStringParams);
  }

  public isMatch(url: string) {
    const { pathname, query } = this.parseUrl(url);

    const keys = [];
    const regex = pathToRegexp(this.path, keys);
    const isMatch = regex.test(pathname);

    if (isMatch) {
      const values = regex.exec(pathname);

      this._query = {
        ...this._query,
        ...this.getQuery(values.slice(1), keys)
      };

      this.queryStringParams = query;
    }

    return isMatch;
  }

  private setPage(url: string): void {
    const { pathname, query } = this.parseUrl(url);

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
        [keys[i].name]: decodeURIComponent(val)
      };
    }, {});
  }

  private parseUrl(url: string) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;

    return {
      pathname,
      query
    };
  }
}

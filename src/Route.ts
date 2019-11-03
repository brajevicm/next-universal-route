import pathToRegexp from 'path-to-regexp';
import { parse } from 'url';

import { NextRoute } from './NextRoute';
import { isFunction } from './lib/isFunction';
import { mapValues } from './lib/mapValues';
import { formatUrl } from './lib/formatUrl';

export class Route {
  public path: string;
  public page?: string;
  public query: object;
  private urlFormatter?: Function;
  private params: object;
  private queryStringParams: object;

  constructor(path: string, page?: string, urlFormatter?: Function) {
    this.path = path;
    this.page = `/${page}`;
    this.query = {};
    this.urlFormatter = urlFormatter;
    this.params = {};
    this.queryStringParams = {};
  }

  public generateUrl(params: object = {}, queryStringParams: object = {}) {
    this.params = this.formatUrl(params);
    this.queryStringParams = this.formatUrl(queryStringParams);

    return new NextRoute(
      this.path,
      this.page,
      this.params,
      this.queryStringParams
    );
  }

  public isMatch(url: string) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;

    const keys = [];
    const regex = pathToRegexp(this.path, keys);
    const isMatch = regex.test(pathname);

    if (isMatch) {
      const values = regex.exec(pathname);
      this.query = { ...this.getQuery(values.slice(1), keys), ...query };
    }

    return isMatch;
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
      if (val === undefined) return params;
      return Object.assign(params, {
        [keys[i].name]: decodeURIComponent(val)
      });
    }, {});
  }
}

import { NextRoute } from './NextRoute';
import { isFunction } from './lib/isFunction';
import { mapValues } from './lib/mapValues';
import { formatUrl } from './lib/formatUrl';

export class Route {
  public path: string;
  public page?: string;
  private urlFormatter?: Function;
  private params: object;
  private queryStringParams: object;

  constructor(path: string, page?: string, urlFormatter?: Function) {
    this.path = path;
    this.page = `/${page}`;
    this.urlFormatter = urlFormatter;
    this.params = {};
    this.queryStringParams = {};
  }

  generateUrl(params = {}, queryStringParams = {}) {
    this.params = this.formatUrl(params);
    this.queryStringParams = this.formatUrl(queryStringParams);

    return new NextRoute(
      this.path,
      this.page,
      this.params,
      this.queryStringParams
    );
  }

  private formatUrl(params: object) {
    let fn: Function = formatUrl;

    if (isFunction(this.urlFormatter)) {
      fn = (string: string) => this.urlFormatter(formatUrl(string));
    }

    return mapValues(params, (param: string | number) =>
      typeof param === 'string' ? fn(param) : param
    );
  }
}

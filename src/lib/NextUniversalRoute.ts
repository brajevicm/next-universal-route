import NextRoute from './NextRoute';
import isFunction from './isFunction';
import mapValues from './mapValues';
import urlify from './urlify';

export default class NextUniversalRoute {
  public path: string;
  public page?: string;
  private urlifyCallback?: Function;
  private params: object;
  private queryStringParams: object;

  constructor(path: string, page?: string, urlifyCallback?: Function) {
    this.path = path;
    this.page = `/${page}`;
    this.urlifyCallback = urlifyCallback;
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
    let fn: Function = urlify;

    if (isFunction(this.urlifyCallback)) {
      fn = (string: string) => this.urlifyCallback(urlify(string));
    }

    return mapValues(params, (param: string | number) =>
      typeof param === 'string' ? fn(param) : param
    );
  }
}

const NextRoute = require('./NextRoute');
const isFunction = require('./lib/isFunction');
const mapValues = require('./lib/mapValues');
const urlify = require('./lib/urlify');

class NextUniversalRoute {
  constructor(path, page, urlifyCallback = null) {
    this.path = path;
    this.page = `/${page}`;
    this.params = {};
    this.queryStringParams = {};
    this.urlifyCallback = urlifyCallback;
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

  formatUrl(params) {
    let fn = urlify;

    if (isFunction(this.urlifyCallback)) {
      fn = string => this.urlifyCallback(urlify(string));
    }

    return mapValues(params, param =>
      typeof param === 'string' ? fn(param) : param
    );
  }
}

module.exports = NextUniversalRoute;

const stringify = require('qs/lib/stringify');
const cloneDeep = require('lodash/cloneDeep');
const isFunction = require('lodash/isFunction');
const mapValues = require('lodash/mapValues');

const generatePath = require('./lib/generatePath');
const urlify = require('./lib/urlify');

class NextRoute {
  constructor(path, page, urlifyCallback = null) {
    this.path = path;
    this.page = page;
    this.params = {};
    this.clientParams = {};
    this.urlifyCallback = urlifyCallback;
  }

  generateUrl(params, queryStringParams = {}) {
    this.params = this.formatUrl(params);
    this.queryStringParams = this.formatUrl(queryStringParams);

    return cloneDeep(this);
  }

  formatUrl(params) {
    let fn = urlify;

    if (isFunction(this.urlifyCallback)) {
      fn = fn(urlify);
    }

    return mapValues(params, param =>
      typeof param === 'string' ? fn(param) : param
    );
  }

  toAs() {
    const path = generatePath(this.path, this.params);
    const queryString = stringify(this.queryStringParams);

    return queryString ? `${path}?${queryString}` : path;
  }

  toHref() {
    const queryString = stringify({
      ...this.params,
      ...this.queryStringParams
    });

    return queryString ? `${this.page}?${queryString}` : this.page;
  }
}

module.exports = NextRoute;

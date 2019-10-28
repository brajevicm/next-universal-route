const stringify = require('qs/lib/stringify');
const generatePath = require('./lib/generatePath');
const isAbsolutePath = require('./lib/isAbsolutePath');

class NextRoute {
  constructor(path, page, params, queryStringParams) {
    this.path = path;
    this.page = page;
    this.params = params;
    this.queryStringParams = queryStringParams;
  }

  toAs() {
    if (isAbsolutePath(this.path)) {
      return this.path;
    }

    const path = generatePath(this.path, this.params);
    const queryString = stringify(this.queryStringParams);

    return queryString ? `${path}?${queryString}` : path;
  }

  toHref() {
    if (isAbsolutePath(this.path)) {
      return this.path;
    }

    const queryString = stringify({
      ...this.params,
      ...this.queryStringParams
    });

    return queryString ? `${this.page}?${queryString}` : this.page;
  }
}

module.exports = NextRoute;

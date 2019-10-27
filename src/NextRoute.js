const stringify = require('qs/lib/stringify');
const generatePath = require('./lib/generatePath');

class NextRoute {
  constructor(path, page, params, queryStringParams) {
    this.path = path;
    this.page = page;
    this.params = params;
    this.queryStringParams = queryStringParams;
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

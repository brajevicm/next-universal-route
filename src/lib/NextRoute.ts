import { stringify } from 'qs';
import generatePath from './generatePath';
import isAbsolutePath from './isAbsolutePath';

export default class NextRoute {
  public path: string;
  public page?: string;
  public params?: object;
  public queryStringParams?: object;

  constructor(
    path: string,
    page?: string,
    params?: object,
    queryStringParams?: object
  ) {
    this.path = path;
    this.page = page;
    this.params = params;
    this.queryStringParams = queryStringParams;
  }

  public toAs() {
    if (isAbsolutePath(this.path)) {
      return this.path;
    }

    const path = generatePath(this.path, this.params);
    const queryString = stringify(this.queryStringParams);

    return queryString ? `${path}?${queryString}` : path;
  }

  public toHref() {
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

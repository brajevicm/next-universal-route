import { stringify } from 'qs';
import { generatePath } from './util/generatePath';
import { isAbsolutePath } from './util/isAbsolutePath';

export class NextRoute {
  public path: string;
  public page?: string;
  public params?: object;
  public queryStringParams?: object;
  public isAbsolutePath: boolean;

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
    this.isAbsolutePath = isAbsolutePath(path);
  }

  public toAs(): string {
    if (this.isAbsolutePath) {
      return this.path;
    }

    const path = generatePath(this.path, this.params);
    const queryString = stringify(this.queryStringParams);

    return queryString ? `${path}?${queryString}` : path;
  }

  public toHref(): string {
    if (this.isAbsolutePath) {
      return this.path;
    }

    const queryString = stringify({
      ...this.params,
      ...this.queryStringParams
    });

    return queryString ? `${this.page}?${queryString}` : this.page;
  }
}

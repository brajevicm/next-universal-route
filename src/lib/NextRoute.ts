import { stringify, parse } from 'qs';
import { generatePath } from '../utils/generatePath';
import { isAbsolutePath } from '../utils/isAbsolutePath';

export class NextRoute {
  public path: string;
  public page?: string;
  public params?: object;
  public queryStringParams?: object;
  public query?: object;
  public isAbsolutePath: boolean;
  private options: { encode: boolean };

  constructor(
    path: string,
    page?: string,
    params?: object,
    queryStringParams?: object,
    query?: object,
    options?: { encode: boolean }
  ) {
    this.path = path;
    this.page = page;
    this.params = params;
    this.queryStringParams = queryStringParams;
    this.query = query;
    this.options = options;
  }

  public toAs(): string {
    if (isAbsolutePath(this.path)) {
      return this.makeAbsolutePath();
    }

    const path = generatePath(this.path, this.params);
    const queryString = stringify(this.queryStringParams, {
      indices: false,
      encode: this.options.encode,
    });

    return queryString ? `${path}?${queryString}` : path;
  }

  public toHref(): string {
    if (isAbsolutePath(this.path)) {
      return this.makeAbsolutePath();
    }

    const queryString = stringify(
      {
        ...this.query,
        ...this.params,
        ...this.queryStringParams,
      },
      { indices: false, encode: this.options.encode }
    );

    return queryString ? `${this.page}?${queryString}` : this.page;
  }

  private makeAbsolutePath(): string {
    const url = new URL(this.path);

    const origin = `${url.protocol}//${url.host}`;
    const generatedPath = generatePath(url.pathname, this.params);

    const path = `${origin}${generatedPath == '/' ? '' : generatedPath}`;

    const searchParams = parse(url.search, { ignoreQueryPrefix: true });

    const queryString = stringify(
      {
        ...searchParams,
        ...this.query,
        ...this.params,
        ...this.queryStringParams,
      },
      { indices: false, encode: this.options.encode }
    );

    return queryString ? `${path}?${queryString}` : path;
  }
}

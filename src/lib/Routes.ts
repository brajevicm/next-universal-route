import { Route } from './Route';

export class Routes {
  private routes: Route[];

  constructor(routes) {
    this.routes = Object.keys(routes).map(key => routes[key]);
  }

  public getRoute(url: string) {
    return this.routes.filter(route => route.isMatch(url))[0];
  }
}

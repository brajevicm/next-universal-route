export const isAbsolutePath = (path: string) =>
  /(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(path);

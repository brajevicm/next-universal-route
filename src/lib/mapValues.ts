export default (o: object, f: Function) =>
  Object.keys(o).reduce((acc: object, key: string) => {
    acc[key] = f(o[key]);
    return acc;
  }, {});

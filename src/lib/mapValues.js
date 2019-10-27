module.exports = (o, f) =>
  Object.keys(o).reduce((acc, key) => {
    acc[key] = f(o[key]);
    return acc;
  }, {});

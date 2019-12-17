export const omitFalsyValues = (object: object) => {
  const objectWithoutFalsyValues = {};

  for (let key in object) {
    if (object.hasOwnProperty(key) && object[key]) {
      objectWithoutFalsyValues[key] = object[key];
    }
  }

  return objectWithoutFalsyValues;
};

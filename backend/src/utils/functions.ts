export const isObjectWithAllProperties = <K extends string>(
  object: unknown,
  ...keys: K[]
): object is Record<string, unknown> & Record<K, unknown> => {
  if (typeof object === "object" && object !== null) {
    for (const key of keys) {
      if (!(key in object)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

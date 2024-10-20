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

export const _delay = async (ms: number) =>
  await new Promise<void>((resolve) =>
    setTimeout(
      () => {
        resolve();
      },
      Math.max(0, ms),
    ),
  );

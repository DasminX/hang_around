import { APIResponseErrorI, ONE_DAY } from "@dasminx/hang-around-common";

export const isKeptTokenValid = (token: string, expirationTime: number) =>
  token?.trim() !== "" && !isNaN(expirationTime) && expirationTime + 90 * ONE_DAY > Date.now();

export const getApiErrorCode = (res: APIResponseErrorI): `api_errors.${string}` => {
  if (Array.isArray(res.error.details) && typeof res.error.details.at(0)?.code === "string") {
    return `api_errors.${res.error.details.at(0)?.code || "UNKNOWN"}`;
  } else {
    return `api_errors.${res.error.errorCode}`;
  }
};

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

import { APIResponseErrorI } from "@dasminx/hang-around-common";

import { NINETY_DAYS } from "./constants";

export const isKeptTokenValid = (token: string, expirationTime: number) =>
  token?.trim() !== "" && !isNaN(expirationTime) && expirationTime + NINETY_DAYS > Date.now(); // TODO CHANGE NINETY_DAYS

export const getApiErrorCode = (res: APIResponseErrorI): `api_errors.${string}` => {
  if (Array.isArray(res.error.details) && typeof res.error.details.at(0)?.code === "string") {
    return `api_errors.${res.error.details.at(0)?.code || "UNKNOWN"}`;
  } else {
    return `api_errors.${res.error.errorCode}`;
  }
};

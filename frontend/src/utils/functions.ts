import { NINETY_DAYS } from "./constants";
import { APIDetailsResponse } from "./types";

export const isKeptTokenValid = (token: string, expirationTime: number) =>
  token?.trim() !== "" && !isNaN(expirationTime) && expirationTime + NINETY_DAYS > Date.now(); // TODO CHANGE NINETY_DAYS

export const getApiErrorCode = (res: APIDetailsResponse): `api_errors.${string}` => {
  if (Array.isArray(res.details) && typeof res.details.at(0)?.code === "string") {
    return `api_errors.${res.details.at(0)?.code || "UNKNOWN"}`;
  } else {
    return `api_errors.${res.errorCode}`;
  }
};

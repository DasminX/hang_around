import { NINETY_DAYS } from "./constants";
import { APIDetailsResponse } from "./types";

export const isKeptTokenValid = (token: string, expirationTime: number) =>
  token?.trim() !== "" && !isNaN(expirationTime) && expirationTime + NINETY_DAYS > Date.now(); // TODO CHANGE NINETY_DAYS

export const getErrorMessage = (
  message: APIDetailsResponse["message"],
  details: APIDetailsResponse["details"],
) => {
  const description = Array.isArray(details)
    ? details.reduce((acc: string, curr: string) => acc.concat(curr.split(":").at(1)?.trim() ?? ""))
    : "";

  return message + "\n" + description;
};

import { NINETY_DAYS } from "./constants";

export const toTimestamp = (date: Date | string) => {
  const transformedDate = new Date(date);
  const timestamp = transformedDate.getTime();

  return isNaN(timestamp) || timestamp >= Date.now() + NINETY_DAYS ? -1 : timestamp;
};

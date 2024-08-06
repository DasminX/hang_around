import { NINETY_DAYS } from "./constants";

export const toTimestamp = (date: Date | string) => {
  let timestamp = -1;

  if (date instanceof Date) {
    timestamp = date.getTime();
  } else if (typeof timestamp === "string") {
    timestamp = new Date(date).getTime();
  }

  if (isNaN(timestamp) || timestamp >= Date.now() + NINETY_DAYS) {
    return -1;
  }

  return timestamp;
};

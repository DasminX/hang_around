import { ONE_DAY } from "@dasminx/hang-around-common";

export const toTimestamp = (date: Date | string) => {
  const transformedDate = new Date(date);
  const timestamp = transformedDate.getTime();

  return isNaN(timestamp) || timestamp >= Date.now() + 90 * ONE_DAY ? -1 : timestamp;
};

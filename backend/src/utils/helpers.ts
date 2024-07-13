import { ObjectOrNull } from "./response";

export const isObjectAndContainsProperties = (object: ObjectOrNull, ...properties: string[]): boolean => {
  let isValid = true;
  if (typeof object === "object" && object != null) {
    for (const property of properties) {
      if (!(property in object)) {
        isValid = false;
        break;
      }
    }
  }
  return isValid;
};

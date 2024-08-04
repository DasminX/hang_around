import { describe, expect, it } from "vitest";

import { isObjectWithAllProperties } from "./functions";

describe("Utility Functions", () => {
  describe("isObjectWithAllProperties", () => {
    it("should return true for an object with all specified properties", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(isObjectWithAllProperties(obj, "a", "b")).toBe(true);
      expect(isObjectWithAllProperties(obj, "a", "b", "c")).toBe(true);
    });

    it("should return false for an object missing one or more specified properties", () => {
      const obj = { a: 1, b: 2 };
      expect(isObjectWithAllProperties(obj, "a", "b", "c")).toBe(false);
      expect(isObjectWithAllProperties(obj, "a", "c")).toBe(false);
    });

    it("should return false for non-object inputs", () => {
      expect(isObjectWithAllProperties(null, "a")).toBe(false);
      expect(isObjectWithAllProperties(undefined, "a")).toBe(false);
      expect(isObjectWithAllProperties(123, "a")).toBe(false);
      expect(isObjectWithAllProperties("string", "a")).toBe(false);
      expect(isObjectWithAllProperties([], "a")).toBe(false);
    });
  });
});

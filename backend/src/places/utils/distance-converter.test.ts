import { HowFar } from "@dasminx/hang-around-common";
import { describe, expect, it } from "vitest";

import { DistanceConverter } from "./distance-converter";

describe("DistanceConverter", () => {
  it("should correctly convert meters to yards", () => {
    const distance: HowFar = { distance: 100, unit: "m" };
    const converter = new DistanceConverter(distance);

    const expectedYards = 100 * 1.0936133;
    expect(converter.getInYards()).toBeCloseTo(expectedYards, 5);
  });

  it("should correctly convert yards to meters", () => {
    const distance: HowFar = { distance: 100, unit: "yd" };
    const converter = new DistanceConverter(distance);

    const expectedMeters = 100 * 0.9144;
    expect(converter.getInMeters()).toBeCloseTo(expectedMeters, 5);
  });

  it("should return the same distance in meters if the unit is already meters", () => {
    const distance: HowFar = { distance: 100, unit: "m" };
    const converter = new DistanceConverter(distance);

    expect(converter.getInMeters()).toBe(distance.distance);
  });

  it("should return the same distance in yards if the unit is already yards", () => {
    const distance: HowFar = { distance: 100, unit: "yd" };
    const converter = new DistanceConverter(distance);

    expect(converter.getInYards()).toBe(distance.distance);
  });

  it("should handle edge cases for zero distance", () => {
    const distanceMeters: HowFar = { distance: 0, unit: "m" };
    const converterMeters = new DistanceConverter(distanceMeters);

    const distanceYards: HowFar = { distance: 0, unit: "yd" };
    const converterYards = new DistanceConverter(distanceYards);

    expect(converterMeters.getInMeters()).toBe(0);
    expect(converterMeters.getInYards()).toBe(0);
    expect(converterYards.getInMeters()).toBe(0);
    expect(converterYards.getInYards()).toBe(0);
  });

  it("should handle large distance values", () => {
    const largeDistanceMeters: HowFar = { distance: 1e6, unit: "m" };
    const converterMeters = new DistanceConverter(largeDistanceMeters);

    const largeDistanceYards: HowFar = { distance: 1e6, unit: "yd" };
    const converterYards = new DistanceConverter(largeDistanceYards);

    expect(converterMeters.getInYards()).toBeCloseTo(1e6 * 1.0936133, 5);
    expect(converterYards.getInMeters()).toBeCloseTo(1e6 * 0.9144, 5);
  });
});

import { GeoPoint } from "firebase/firestore";
import { describe, expect, it } from "vitest";

import { LocationArgs, LocationVO } from ".";

describe("LocationVO", () => {
  it("should create an instance from an array", () => {
    const locationArgs: LocationArgs = [40.7128, -74.006];
    const location = new LocationVO(locationArgs);

    expect(location.lat).toBe(40.7128);
    expect(location.lng).toBe(-74.006);
  });

  it("should create an instance from a GeoPoint", () => {
    const geoPoint = new GeoPoint(40.7128, -74.006);
    const locationArgs: LocationArgs = geoPoint;
    const location = new LocationVO(locationArgs);

    expect(location.lat).toBe(geoPoint.latitude);
    expect(location.lng).toBe(geoPoint.longitude);
  });

  it("should create an instance from an object", () => {
    const locationArgs: LocationArgs = { lat: 40.7128, lng: -74.006 };
    const location = new LocationVO(locationArgs);

    expect(location.lat).toBe(40.7128);
    expect(location.lng).toBe(-74.006);
  });

  it("should correctly compare two equal LocationVO instances", () => {
    const location1 = new LocationVO([40.7128, -74.006]);
    const location2 = new LocationVO({ lat: 40.7128, lng: -74.006 });

    expect(location1.equals(location2)).toBe(true);
  });

  it("should correctly compare two unequal LocationVO instances", () => {
    const location1 = new LocationVO([40.7128, -74.006]);
    const location2 = new LocationVO({ lat: 34.0522, lng: -118.2437 });

    expect(location1.equals(location2)).toBe(false);
  });

  it("should correctly convert to GeoPoint", () => {
    const locationArgs: LocationArgs = { lat: 40.7128, lng: -74.006 };
    const location = new LocationVO(locationArgs);

    const geoPoint = location.toGeoPoint();
    expect(geoPoint).toBeInstanceOf(GeoPoint);
    expect(geoPoint.latitude).toBe(40.7128);
    expect(geoPoint.longitude).toBe(-74.006);
  });

  it("should correctly convert to tuple", () => {
    const locationArgs: LocationArgs = { lat: 40.7128, lng: -74.006 };
    const location = new LocationVO(locationArgs);

    const tuple = location.toTuple();
    expect(tuple).toEqual([40.7128, -74.006]);
  });

  it("should handle edge cases for coordinates", () => {
    const edgeCaseArgs: LocationArgs = { lat: 0, lng: 0 };
    const location = new LocationVO(edgeCaseArgs);

    expect(location.lat).toBe(0);
    expect(location.lng).toBe(0);
  });
});

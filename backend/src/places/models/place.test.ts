import { describe, expect, it } from "vitest";

import { LocationVO } from "../../shared/value-objects/location";
import { Place, PlaceArgs } from "./place";

describe("Place Model", () => {
  const placeArgs: PlaceArgs = {
    id: "1",
    name: "Central Park",
    rating: 4.5,
    mapsUri: "http://maps.google.com/centralpark",
    location: new LocationVO([40.7128, -74.006]),
    isAccessible: true,
  };

  it("should create an instance of Place with provided arguments", () => {
    const place = new Place(placeArgs);

    expect(place).toBeInstanceOf(Place);
    expect(place.id).toBe(placeArgs.id);
    expect(place.name).toBe(placeArgs.name);
    expect(place.location).toBe(placeArgs.location);
    expect(place.rating).toBe(placeArgs.rating);
    expect(place.mapsUri).toBe(placeArgs.mapsUri);
    expect(place.isAccessible).toBe(placeArgs.isAccessible);
  });

  it("should have properties of correct types", () => {
    const place = new Place(placeArgs);

    expect(typeof place.id).toBe("string");
    expect(typeof place.name).toBe("string");
    expect(typeof place.rating).toBe("number");
    expect(typeof place.mapsUri).toBe("string");
    expect(place.location).toBeInstanceOf(LocationVO);
    expect(typeof place.isAccessible).toBe("boolean");
  });
});
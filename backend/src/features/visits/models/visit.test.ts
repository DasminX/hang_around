import { Location, Timestamp, VisitArgs } from "@dasminx/hang-around-common";
import { describe, expect, it } from "vitest";

import { Visit } from "./visit";

describe("Visit Model", () => {
  const location = new Location([40.7128, -74.006]);
  const timestamp: Timestamp = Date.now() as Timestamp;

  const visitArgs: VisitArgs = {
    id: "123",
    name: "Central Park",
    location: location,
    rating: 4.5,
    mapsUri: "http://maps.google.com/centralpark",
    isAccessible: true,
    userId: "user-456",
    happenedAt: timestamp,
  };

  it("should create an instance of Visit with provided arguments", () => {
    const visit = new Visit(visitArgs);

    expect(visit).toBeInstanceOf(Visit);
    expect(visit.id).toBe(visitArgs.id);
    expect(visit.name).toBe(visitArgs.name);
    expect(visit.location).toBe(visitArgs.location);
    expect(visit.rating).toBe(visitArgs.rating);
    expect(visit.mapsUri).toBe(visitArgs.mapsUri);
    expect(visit.isAccessible).toBe(visitArgs.isAccessible);
    expect(visit.userId).toBe(visitArgs.userId);
    expect(visit.happenedAt).toBe(visitArgs.happenedAt);
  });

  it("should handle URL and string for mapsUri", () => {
    const urlVisitArgs: VisitArgs = { ...visitArgs, mapsUri: new URL("http://maps.google.com/centralpark") };
    const urlVisit = new Visit(urlVisitArgs);
    expect(urlVisit.mapsUri).toBeInstanceOf(URL);
    expect(urlVisit.mapsUri.toString()).toBe("http://maps.google.com/centralpark");

    const stringVisitArgs: VisitArgs = { ...visitArgs, mapsUri: "http://maps.google.com/centralpark" };
    const stringVisit = new Visit(stringVisitArgs);
    expect(stringVisit.mapsUri).toBe("http://maps.google.com/centralpark");
  });

  it("should handle edge cases for rating", () => {
    const visitArgsWithEdgeCaseRating: VisitArgs = { ...visitArgs, rating: -1 };
    const visit = new Visit(visitArgsWithEdgeCaseRating);
    expect(visit.rating).toBe(-1);
  });

  it("should handle edge cases for happenedAt", () => {
    const visitArgsWithEdgeCaseTimestamp: VisitArgs = { ...visitArgs, happenedAt: 0 as Timestamp };
    const visit = new Visit(visitArgsWithEdgeCaseTimestamp);
    expect(visit.happenedAt).toBe(0);
  });

  it("should handle missing optional properties gracefully", () => {
    const visitArgsWithMissingProperties: Partial<VisitArgs> = {
      id: "123",
      name: "Test Visit",
      location: location,
      rating: 3.5,

      userId: "user-789",
      happenedAt: timestamp,
    };

    const visit = new Visit(visitArgsWithMissingProperties as VisitArgs);
    expect(visit.id).toBe(visitArgsWithMissingProperties.id);
    expect(visit.name).toBe(visitArgsWithMissingProperties.name);
    expect(visit.location).toBe(visitArgsWithMissingProperties.location);
    expect(visit.rating).toBe(visitArgsWithMissingProperties.rating);
    expect(visit.mapsUri).toBeUndefined();
    expect(visit.isAccessible).toBeUndefined();
    expect(visit.userId).toBe(visitArgsWithMissingProperties.userId);
    expect(visit.happenedAt).toBe(visitArgsWithMissingProperties.happenedAt);
  });
});

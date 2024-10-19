import { Location, Timestamp, VisitArgs } from "@dasminx/hang-around-common";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { Visit } from "../../models/visit";
import { InMemoryVisitsDatabase } from "./in-memory";

vi.mock("crypto", () => ({
  randomUUID: vi.fn(),
}));

describe("InMemoryVisitsDatabase", () => {
  let visitsDatabase: InMemoryVisitsDatabase;
  const userId = "user-123";

  const visitArgs: Omit<VisitArgs, "id"> = {
    name: "Visit Name",
    location: new Location([40.7128, -74.006]),
    rating: 5,
    mapsUri: new URL("http://example.com"),
    isAccessible: true,
    userId,
    happenedAt: Date.now() as Timestamp,
  };

  beforeEach(() => {
    visitsDatabase = new InMemoryVisitsDatabase();
    (randomUUID as Mock).mockReset();
  });

  it("should create a new visit", async () => {
    (randomUUID as Mock).mockReturnValueOnce("visit-uuid");

    const visit = await visitsDatabase.createVisit(visitArgs);

    expect(visit).toBeInstanceOf(Visit);
    expect(visit.id).toBe("visit-uuid");
    expect(visit.name).toBe(visitArgs.name);
    expect(visit.location).toEqual(visitArgs.location);
    expect(visit.rating).toBe(visitArgs.rating);
    expect(visit.mapsUri).toEqual(visitArgs.mapsUri);
    expect(visit.isAccessible).toBe(visitArgs.isAccessible);
    expect(visit.userId).toBe(visitArgs.userId);
    expect(visit.happenedAt).toBe(visitArgs.happenedAt);
  });

  it("should get visits for a user", async () => {
    (randomUUID as Mock).mockReturnValueOnce("visit-uuid-1");
    await visitsDatabase.createVisit(visitArgs);

    (randomUUID as Mock).mockReturnValueOnce("visit-uuid-2");
    await visitsDatabase.createVisit(visitArgs);

    const visits = await visitsDatabase.getVisitsForUser(userId);

    expect(visits).toHaveLength(2);
    expect(visits[0]!.userId).toBe(userId);
    expect(visits[1]!.userId).toBe(userId);
  });

  it("should get a visit by ID for a user", async () => {
    (randomUUID as Mock).mockReturnValueOnce("visit-uuid");
    await visitsDatabase.createVisit(visitArgs);

    const visit = await visitsDatabase.getVisitById("visit-uuid", userId);

    expect(visit).not.toBeNull();
    expect(visit?.id).toBe("visit-uuid");
    expect(visit?.userId).toBe(userId);
  });

  it("should return null for a non-existent visit ID", async () => {
    const visit = await visitsDatabase.getVisitById("non-existent-id", userId);
    expect(visit).toBeNull();
  });
});

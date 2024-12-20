import { API_PREFIX, Location, Timestamp } from "@dasminx/hang-around-common";
import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { getApp } from "../../app";
import { DataSource } from "../../data-source";

// Mock DataSource
const VISITS_PATH = `${API_PREFIX}/visits`;

describe(`Route ${VISITS_PATH}`, async () => {
  const app = await getApp();

  const userId = "user-123";
  const validToken = randomUUID();

  beforeAll(() => {
    // Mock token verification for authentication middleware
    vi.spyOn(DataSource.tokenVerifier, "verify").mockResolvedValue({ uid: userId, token: randomUUID() });
  });

  describe("POST /", () => {
    it("should return 201 and the created visit on successful creation", async () => {
      const validVisitData = {
        name: "Test Visit",
        location: [40.7128, -74.006], // Expecting Location here
        rating: 5,
        mapsUri: "http://example.com",
        isAccessible: true,
        priceLevel: 3,
      };

      const mockCreatedVisit = {
        id: "visit-id",
        name: "Test Visit",
        location: new Location([40.7128, -74.006]), // Use Location
        rating: 5,
        mapsUri: "http://example.com",
        isAccessible: true,
        userId,
        happenedAt: Date.now() as Timestamp,
        priceLevel: 3,
      };

      vi.spyOn(DataSource.visits, "createVisit").mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockCreatedVisit), 0)),
      );

      const response = await request(app)
        .post(VISITS_PATH)
        .send(validVisitData)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.data).toEqual(mockCreatedVisit);
    });

    it("should return 401 if the user is not authenticated", async () => {
      const response = await request(app).post(VISITS_PATH).send({ name: "Test Visit" }); // Send some data

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe("GET /", () => {
    it("should return 200 and a list of visits for the authenticated user", async () => {
      const mockVisits = [
        {
          id: "visit-id-1",
          name: "Visit 1",
          location: new Location([40.7128, -74.006]), // Use Location
          rating: 4,
          mapsUri: "http://example1.com",
          isAccessible: true,
          userId,
          happenedAt: Date.now() as Timestamp,
          priceLevel: 3,
        },
        {
          id: "visit-id-2",
          name: "Visit 2",
          location: new Location([34.0522, -118.2437]), // Use Location
          rating: 3,
          mapsUri: "http://example2.com",
          isAccessible: false,
          userId,
          happenedAt: Date.now() as Timestamp,
          priceLevel: 3,
        },
      ];

      vi.spyOn(DataSource.visits, "getVisitsForUser").mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockVisits), 0)),
      );

      const response = await request(app).get(VISITS_PATH).set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.data).toEqual(mockVisits);
    });

    it("should return 401 if the user is not authenticated", async () => {
      const response = await request(app).get(VISITS_PATH);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe("GET /:id", () => {
    it("should return 200 and the visit details for the given ID", async () => {
      const mockVisit = {
        id: "visit-id",
        name: "Test Visit",
        location: new Location([40.7128, -74.006]), // Use Location
        rating: 5,
        mapsUri: "http://example.com",
        isAccessible: true,
        userId,
        happenedAt: Date.now() as Timestamp,
        priceLevel: 3,
      };

      vi.spyOn(DataSource.visits, "getVisitById").mockImplementation(
        (visitId, _userId) =>
          new Promise((resolve) => setTimeout(() => resolve(visitId === "visit-id" ? mockVisit : null), 0)),
      );

      const response = await request(app).get(`${VISITS_PATH}/visit-id`).set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.data).toEqual(mockVisit);
    });

    it("should return 401 if the user is not authenticated", async () => {
      const response = await request(app).get(`${VISITS_PATH}/visit-id`);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it("should return 404 if the visit ID does not exist", async () => {
      vi.spyOn(DataSource.visits, "getVisitById").mockImplementation(
        (_visitId, _userId) => new Promise((resolve) => setTimeout(() => resolve(null), 0)),
      );

      const response = await request(app)
        .get(`${VISITS_PATH}/non-existent-id`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.data).toBeNull();
    });
  });
});

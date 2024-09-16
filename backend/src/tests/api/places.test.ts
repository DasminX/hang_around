import { API_PREFIX, ErrorCode, LocationVO } from "@dasminx/hang-around-common";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { getNodeApp } from "../../app";
import { Place } from "../../features/places/models/place";
import { DataSource } from "../../shared/data-source";
import {
  INVALID_FIND_PLACES_REQUEST,
  VALID_FIND_PLACES_REQUEST,
  VALID_SIGN_IN_CREDENTIALS,
  VALID_SIGN_UP_CREDENTIALS,
} from "../test-data";

const app = getNodeApp();
const PLACES_PATH = `${API_PREFIX}/places`;

describe(`Route ${PLACES_PATH}`, () => {
  let authToken: string;

  beforeAll(async () => {
    await request(app).post(`${API_PREFIX}/auth/signup`).send(VALID_SIGN_UP_CREDENTIALS);
    const signInResponse = await request(app).post(`${API_PREFIX}/auth/signin`).send(VALID_SIGN_IN_CREDENTIALS);
    authToken = signInResponse.body.data.token;
  });

  describe("POST /find", () => {
    it("should return 200 with valid data when authenticated", async () => {
      vi.spyOn(DataSource.places, "find").mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve([
                new Place({
                  id: "123",
                  isAccessible: true,
                  location: new LocationVO([1, 2]),
                  mapsUri: "https://hav1.com",
                  name: "Mock place",
                  rating: 4,
                }),
              ]);
            }, 0),
          ),
      );

      const response = await request(app)
        .post(`${PLACES_PATH}/find`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(VALID_FIND_PLACES_REQUEST);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toHaveProperty("data");

      expect(response.body.data[0].id).toEqual("123");
      expect(response.body.data[0].isAccessible).toBeTruthy();
      expect(new LocationVO(response.body.data[0].location).equals(new LocationVO([1, 2]))).toBeTruthy();

      expect(response.body.data[0].mapsUri).toMatch(/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}(?:\/[\w.-]*)*$/);
      expect(response.body.data[0].name).toEqual("Mock place");
      expect(response.body.data[0].rating).toEqual(4);
    });

    it("should return 401 when no token is provided", async () => {
      const response = await request(app).post(`${PLACES_PATH}/find`).send(VALID_FIND_PLACES_REQUEST);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body.error.errorCode).toBe(ErrorCode.NOT_AUTHENTICATED);
    });

    it("should return 401 when an invalid token is provided", async () => {
      const response = await request(app)
        .post(`${PLACES_PATH}/find`)
        .set("Authorization", "Bearer invalid-token")
        .send(VALID_FIND_PLACES_REQUEST);

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body.error.errorCode).toBe(ErrorCode.NOT_AUTHENTICATED);
    });

    it("should return 400 when invalid data is provided", async () => {
      const response = await request(app)
        .post(`${PLACES_PATH}/find`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(INVALID_FIND_PLACES_REQUEST);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);
    });

    it("should handle timeout properly", async () => {
      vi.spyOn(DataSource.places, "find").mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve, 10000)),
      );

      const response = await request(app)
        .post(`${PLACES_PATH}/find`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(VALID_FIND_PLACES_REQUEST);

      expect(response.status).toBe(StatusCodes.REQUEST_TIMEOUT);
      expect(response.body.error.errorCode).toBe(ErrorCode.TIMEOUT);
    });
  });
});

import { API_PREFIX } from "@dasminx/hang-around-common";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { getApp } from "../../app";

const HEALTHCHECK_PATH = `${API_PREFIX}/healthcheck`;

describe(`Route ${HEALTHCHECK_PATH}`, async () => {
  const app = await getApp();

  describe("GET /", () => {
    it("should give statusCode equal 200", async () => {
      const response = await request(app).get(HEALTHCHECK_PATH);
      expect(response.status).toBe(StatusCodes.OK);
    });

    it("should yield an object with property 'alive' with true value", async () => {
      const response = await request(app).get(HEALTHCHECK_PATH);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toHaveProperty("alive");
      expect(response.body.alive).toBeTruthy();
    });
  });
});

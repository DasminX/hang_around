import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { getNodeApp } from "../../app";
import { API_PREFIX } from "./../../../../libs/hang-around-contracts/src/constants/index";

const app = getNodeApp();
const HEALTHCHECK_PATH = `${API_PREFIX}/healthcheck`;

describe(`Route ${HEALTHCHECK_PATH}`, () => {
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

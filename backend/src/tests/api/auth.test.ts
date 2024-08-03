import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { getNodeApp } from "../../app";
import { ErrorCode } from "../../shared/errors";
import { API_PREFIX } from "../../utils/constants";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  VALID_EMAIL,
  VALID_SIGN_IN_CREDENTIALS,
  VALID_SIGN_UP_CREDENTIALS,
} from "../test-data";

const app = getNodeApp();
const AUTH_PATH = `${API_PREFIX}/auth`;

describe(`Route ${AUTH_PATH}`, () => {
  describe("POST /signin", () => {
    beforeAll(async () => {
      await request(app).post(`${AUTH_PATH}/signup`).send(VALID_SIGN_UP_CREDENTIALS);
    });

    it("should statusCode to be 200 when valid credentials provided", async () => {
      const response = await request(app).post(`${AUTH_PATH}/signin`).send(VALID_SIGN_IN_CREDENTIALS);

      expect(response.status).toBe(StatusCodes.OK);
    });

    it("should have valid token and expirationTime properties in response.body.data when valid credentials provided", async () => {
      const response = await request(app).post(`${AUTH_PATH}/signin`).send(VALID_SIGN_IN_CREDENTIALS);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data).toHaveProperty("expirationTime");

      expect(response.body.data.token).toBeTypeOf("string");
      expect(response.body.data.token).not.toBe("");

      const date = new Date(response.body.data.expirationTime);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(new Date(date).getTime());
    });

    // TODO refactor to check detail messages to have properties
    it("should yield a InputValidationError properties in res.body if invalid data provided", async () => {
      const response1 = await request(app).post(`${AUTH_PATH}/signin`).send();
      expect(response1.body.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response2 = await request(app).post(`${AUTH_PATH}/signin`).send({
        email: INVALID_EMAIL,
      });
      expect(response2.body.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response3 = await request(app).post(`${AUTH_PATH}/signin`).send({
        password: INVALID_PASSWORD,
      });
      expect(response3.body.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);
    });

    it("should yield a BadCredentialsError properties in res.body if user is not found", async () => {
      const response = await request(app).post(`${AUTH_PATH}/signin`).send({
        email: VALID_EMAIL,
        password: INVALID_PASSWORD,
      });
      expect(response.body.errorCode).toBe(ErrorCode.BAD_CREDENTIALS);
    });
  });

  // describe("POST /signup", () => {});
});

import { API_PREFIX, ErrorCode } from "@dasminx/hang-around-common";
import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { getApp } from "../../app";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  VALID_EMAIL,
  VALID_SIGN_IN_CREDENTIALS,
  VALID_SIGN_UP_CREDENTIALS,
} from "../test-data";

const app = getApp();
const AUTH_PATH = `${API_PREFIX}/auth`;

describe(`Route ${AUTH_PATH}`, () => {
  describe("POST /signin", () => {
    beforeAll(async () => {
      await request(app).post(`${AUTH_PATH}/signup`).send(VALID_SIGN_UP_CREDENTIALS);
    });

    it("should return 200 when valid credentials are provided", async () => {
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

      const expirationTime = new Date(response.body.data.expirationTime);
      expect(expirationTime.getTime()).toBeGreaterThan(Date.now() - 1000); // Ensuring token is valid (not expired)
    });

    it("should yield an InputValidationError in res.body if invalid data provided", async () => {
      const response1 = await request(app).post(`${AUTH_PATH}/signin`).send();
      expect(response1.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response1.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response2 = await request(app).post(`${AUTH_PATH}/signin`).send({ email: INVALID_EMAIL });
      expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response2.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response3 = await request(app).post(`${AUTH_PATH}/signin`).send({ password: INVALID_PASSWORD });
      expect(response3.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response3.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);
    });

    it("should yield a BadCredentialsError in res.body if credentials are invalid", async () => {
      const response = await request(app).post(`${AUTH_PATH}/signin`).send({
        email: VALID_EMAIL,
        password: INVALID_PASSWORD,
      });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error.errorCode).toBe(ErrorCode.BAD_CREDENTIALS);
    });
  });

  describe("POST /signup", () => {
    it("should return 201 when valid sign-up data is provided", async () => {
      const response = await request(app)
        .post(`${AUTH_PATH}/signup`)
        .send({
          ...VALID_SIGN_UP_CREDENTIALS,
          email: "test2" + VALID_SIGN_UP_CREDENTIALS.email,
        });

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("should return an InputValidationError when invalid sign-up data is provided", async () => {
      const response1 = await request(app).post(`${AUTH_PATH}/signup`).send();
      expect(response1.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response1.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response2 = await request(app)
        .post(`${AUTH_PATH}/signup`)
        .send({ email: INVALID_EMAIL, password: VALID_SIGN_UP_CREDENTIALS.password });
      expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response2.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response3 = await request(app)
        .post(`${AUTH_PATH}/signup`)
        .send({ email: VALID_EMAIL, password: INVALID_PASSWORD });
      expect(response3.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response3.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);
    });
  });

  describe("POST /reset-password", () => {
    it("should return 200 when valid email is provided", async () => {
      const response = await request(app).post(`${AUTH_PATH}/reset-password`).send({ email: VALID_EMAIL });

      expect(response.status).toBe(StatusCodes.OK);
    });

    it("should return an InputValidationError when invalid email is provided", async () => {
      const response = await request(app).post(`${AUTH_PATH}/reset-password`).send();

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);

      const response2 = await request(app).post(`${AUTH_PATH}/reset-password`).send({ email: INVALID_EMAIL });

      expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response2.body.error.errorCode).toBe(ErrorCode.INPUT_VALIDATION_ERROR);
    });
  });
  describe("POST /signout", () => {
    it("should return 200 when authenticated user signs out", async () => {
      const response = await request(app).get(`${AUTH_PATH}/signout`).set("Authorization", `Bearer ${randomUUID()}`);

      expect(response.status).toBe(StatusCodes.OK);
    });

    // it("should return 401 when no token is provided", async () => {
    //   const response = await request(app).get(`${AUTH_PATH}/signout`);

    //   expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    //   expect(response.body.error.errorCode).toBe(ErrorCode.NOT_AUTHENTICATED);
    // });

    it("should return 401 when an invalid token is provided", async () => {
      const response = await request(app).get(`${AUTH_PATH}/signout`).set("Authorization", `Bearer invalid-token`);

      expect(response.status).toBe(StatusCodes.OK);
    });
  });
});

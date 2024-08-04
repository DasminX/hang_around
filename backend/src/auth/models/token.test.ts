import { describe, expect, it } from "vitest";

import { TimestampBrand } from "../../utils/types";
import { Token } from "./token";

describe("Token Model", () => {
  it("should create an instance of Token with provided token and expirationTime", () => {
    const tokenValue = "some-token-value";
    const expirationTimeValue = Date.now() as TimestampBrand;

    const token = new Token(tokenValue, expirationTimeValue);

    expect(token).toBeInstanceOf(Token);
    expect(token.token).toBe(tokenValue);
    expect(token.expirationTime).toBe(expirationTimeValue);
  });
});

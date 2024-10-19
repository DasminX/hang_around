import { isKeptTokenValid } from "../functions";

const TEN_SECONDS_AHEAD = Date.now() + 10000;

describe("isKeptTokenValid function", () => {
  it("should be truthy if trimmed string is empty", () => {
    const t = "";
    const t2 = "        ";

    const tIsValid = isKeptTokenValid(t, TEN_SECONDS_AHEAD);
    const t2IsValid = isKeptTokenValid(t2, TEN_SECONDS_AHEAD);

    expect(tIsValid).toBeFalsy();
    expect(t2IsValid).toBeFalsy();
  });

  it("should be truthy if token is not empty", () => {
    const t = "abc";

    const tIsValid = isKeptTokenValid(t, TEN_SECONDS_AHEAD);

    expect(tIsValid).toBeTruthy();
  });

  it("should be falsy if expirationTime yields NaN", () => {
    const validToken = "abc";
    const mockNaN = NaN;

    const tIsValid = isKeptTokenValid(validToken, mockNaN);

    expect(tIsValid).toBeFalsy();
  });

  it("should be falsy if expirationTime is a number bot is not greater than current timestamp", () => {
    const validToken = "abc";
    const validexpirationTime = 1;

    const isValid = isKeptTokenValid(validToken, validexpirationTime);

    expect(isValid).toBeFalsy();
  });
});

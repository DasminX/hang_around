import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { NotAuthenticatedError } from "../../errors";
import { InMemoryTokenVerifier } from "./in-memory";

vi.mock("crypto", () => ({
  randomUUID: vi.fn(),
}));

describe("InMemoryTokenVerifier", () => {
  let tokenVerifier: InMemoryTokenVerifier;

  beforeEach(() => {
    tokenVerifier = new InMemoryTokenVerifier();
  });

  it("should return a valid user ID for a valid token", async () => {
    const mockToken = "valid-token-uuid";
    (randomUUID as Mock).mockReturnValueOnce("valid-token-uuid");

    const result = await tokenVerifier.verify(mockToken);

    expect(result).toEqual({ uid: "VALID-AUTHENTICATED-UUID" });
  });

  it("should throw NotAuthenticatedError for an invalid token", async () => {
    const mockToken = "invalid-token";
    (randomUUID as Mock).mockReturnValueOnce("valid-token-uuid");

    await expect(tokenVerifier.verify(mockToken)).rejects.toThrow(NotAuthenticatedError);
  });
});

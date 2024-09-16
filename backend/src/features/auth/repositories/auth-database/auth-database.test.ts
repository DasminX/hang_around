import { beforeEach, describe, expect, it, vi } from "vitest";

import { AccountAlreadyExistsError, BadCredentialsError } from "../../../../shared/errors";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";
import { AuthInMemoryDatabase } from "./in-memory";

describe("AuthInMemoryDatabase", () => {
  let authDb: AuthDatabaseI;

  beforeEach(() => {
    authDb = new AuthInMemoryDatabase();
  });

  describe("signUp", () => {
    it("should sign up a new user", async () => {
      await authDb.signUp("test@example.com", "Password1!");

      const token = await authDb.signIn("test@example.com", "Password1!");
      expect(token).toBeInstanceOf(Token);
    });

    it("should not add a user if email already exists", async () => {
      await authDb.signUp("test@example.com", "Password1!");

      await expect(authDb.signUp("test@example.com", "Password2@")).rejects.toThrow(AccountAlreadyExistsError);
    });
  });

  describe("signIn", () => {
    it("should sign in an existing user", async () => {
      await authDb.signUp("test@example.com", "Password1!");
      const token = await authDb.signIn("test@example.com", "Password1!");

      expect(token).toBeInstanceOf(Token);
      expect(token.token).toBeTypeOf("string");
      expect(token.token).not.toBe("");
      expect(token.expirationTime).toBeTypeOf("number");
    });

    it("should throw BadCredentialsError for invalid credentials", async () => {
      await authDb.signUp("test@example.com", "Password1!");
      await expect(authDb.signIn("test@example.com", "Wrongpass1!")).rejects.toThrow(BadCredentialsError);
      await expect(authDb.signIn("nonexistent@example.com", "Password1!")).rejects.toThrow(BadCredentialsError);
    });
  });

  describe("resetPassword", () => {
    it("should log the reset password attempt", async () => {
      console.log = vi.fn();
      await authDb.resetPassword("test@example.com");
      expect(console.log).toHaveBeenCalledWith("Tried to send reset-password token for email test@example.com");
    });
  });

  describe("signOut", () => {
    it("should log the sign out attempt", async () => {
      console.log = vi.fn();
      await authDb.signOut();
      expect(console.log).toHaveBeenCalledWith("To be implemented!");
    });
  });
});

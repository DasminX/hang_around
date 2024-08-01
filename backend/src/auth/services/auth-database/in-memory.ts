import { randomBytes } from "crypto";

import { Timestamp } from "../../../utils/types";
import { Token } from "../../token/token.model";
import { AuthDatabaseI } from "./abstract";

export class AuthInMemoryDatabase implements AuthDatabaseI {
  private static _db: Record<string, unknown>[];

  async signIn(email: string, password: string) {
    const isValidCredentials = AuthInMemoryDatabase._db.find(
      (account) => account.email === email && account.password === password,
    );

    if (!isValidCredentials) {
      throw new Error();
    }

    return new Token(randomBytes(32).toString(), Date.now() as Timestamp);
  }
  async signUp(email: string, password: string) {
    AuthInMemoryDatabase._db.push({ email, password });
  }

  async forgotPassword(email: string) {
    console.log(`Tried to send forgot-password token for email ${email}`);
  }
}

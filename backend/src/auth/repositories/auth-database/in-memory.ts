import { randomBytes } from "crypto";

import { BadCredentialsError } from "../../../shared/errors";
import { TimestampBrand } from "../../../utils/types";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";

type MockUser = { email: string; password: string };

// TODO pomyśleć o email isVerified!
export class AuthInMemoryDatabase implements AuthDatabaseI {
  private _db: MockUser[] = [];

  async signIn(email: string, password: string): Promise<Token> {
    const isValidCredentials = this._db.find((account) => account.email === email && account.password === password);

    if (!isValidCredentials) {
      throw new BadCredentialsError();
    }

    return new Token(randomBytes(32).toString(), Date.now() as TimestampBrand);
  }
  async signUp(email: string, password: string): Promise<void> {
    this._db.push({ email, password });
  }

  async forgotPassword(email: string): Promise<void> {
    console.log(`Tried to send forgot-password token for email ${email}`);
  }
}
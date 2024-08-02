import { randomUUID } from "crypto";

import { BadCredentialsError } from "../../../shared/errors";
import { TimestampBrand } from "../../../utils/types";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";

type MockUser = { email: string; password: string };

export class AuthInMemoryDatabase implements AuthDatabaseI {
  private db: MockUser[] = [];

  async signIn(email: string, password: string): Promise<Token> {
    const isValidCredentials = this.db.find((account) => account.email === email && account.password === password);

    if (!isValidCredentials) {
      throw new BadCredentialsError();
    }

    return new Token(randomUUID(), Date.now() as TimestampBrand);
  }
  async signUp(email: string, password: string): Promise<void> {
    this.db.push({ email, password });
  }

  async forgotPassword(email: string): Promise<void> {
    console.log(`Tried to send forgot-password token for email ${email}`);
  }
}

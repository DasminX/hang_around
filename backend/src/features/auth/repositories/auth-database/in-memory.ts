import { Timestamp } from "@dasminx/hang-around-common";
import { randomUUID } from "crypto";

import { AccountAlreadyExistsError, BadCredentialsError } from "../../../../shared/errors";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";

type MockUser = { email: string; password: string };

export class AuthInMemoryDatabase implements AuthDatabaseI {
  private _db: MockUser[] = [
    {
      email: "wojtas@hademoapp.com",
      password: "Aaaaaa1!",
    },
  ];

  async signIn(email: string, password: string): Promise<Token> {
    const isValidCredentials = this._db.find((account) => account.email === email && account.password === password);

    if (!isValidCredentials) {
      throw new BadCredentialsError();
    }

    return new Token(randomUUID(), Date.now() as Timestamp);
  }
  async signUp(email: string, password: string): Promise<void> {
    if (!this._db.find((account) => account.email === email)) {
      this._db.push({ email, password });
      return;
    }

    throw new AccountAlreadyExistsError();
  }

  async resetPassword(email: string): Promise<void> {
    console.log(`Tried to send reset-password token for email ${email}`);
  }

  async signOut(): Promise<void> {
    console.log("To be implemented!");
  }
}

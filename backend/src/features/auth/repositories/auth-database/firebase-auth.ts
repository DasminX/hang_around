import { ONE_HOUR, Timestamp } from "@dasminx/hang-around-common";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { EmailNotConfirmedError } from "../../../../shared/errors";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";

export class AuthFirebase implements AuthDatabaseI {
  constructor(private readonly _clientAuth: Auth) {}

  async signIn(email: string, password: string): Promise<Token> {
    const { user } = await signInWithEmailAndPassword(this._clientAuth, email, password);

    if (!user.emailVerified) {
      throw new EmailNotConfirmedError();
    }

    const idTokenResult = await user.getIdTokenResult();
    const timestamp = Number.isNaN(Number(idTokenResult.claims.exp))
      ? ((Date.now() + ONE_HOUR) as Timestamp)
      : ((Number(idTokenResult.claims.exp) * 1000) as Timestamp);

    return new Token(idTokenResult.token, timestamp);
  }

  async signUp(email: string, password: string): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(this._clientAuth, email, password);

    await sendEmailVerification(user);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this._clientAuth, email);
  }

  async signOut(): Promise<void> {
    console.log("To be implemented!!!");
  }
}

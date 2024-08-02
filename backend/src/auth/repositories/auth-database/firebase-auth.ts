import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { EmailNotConfirmedError } from "../../../shared/errors";
import { FirebaseProvider } from "../../../shared/firebase-provider";
import { ONE_HOUR } from "../../../utils/constants";
import { TimestampBrand } from "../../../utils/types";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";

export class AuthFirebase implements AuthDatabaseI {
  async signIn(email: string, password: string): Promise<Token> {
    const { user } = await signInWithEmailAndPassword(FirebaseProvider.clientAuth, email, password);

    if (!user.emailVerified) {
      throw new EmailNotConfirmedError();
    }

    const idTokenResult = await user.getIdTokenResult();
    const timestamp = Number.isNaN(Number(idTokenResult.claims.exp))
      ? ((Date.now() + ONE_HOUR) as TimestampBrand)
      : (Number(idTokenResult.claims.exp) as TimestampBrand);

    return new Token(idTokenResult.token, timestamp);
  }

  async signUp(email: string, password: string): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(FirebaseProvider.clientAuth, email, password);

    await sendEmailVerification(user);
  }

  async forgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(FirebaseProvider.clientAuth, email);
  }
}
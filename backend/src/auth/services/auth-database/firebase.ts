import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { EmailNotConfirmedError } from "../../../shared/errors";
import { FirebaseService } from "../../../shared/firebase.service";
import { ONE_HOUR } from "../../../utils/constants";
import { Timestamp } from "../../../utils/types";
import { Token } from "../../models/token";
import { AuthDatabaseI } from "./abstract";

export class AuthFirebase implements AuthDatabaseI {
  async signIn(email: string, password: string): Promise<Token> {
    const { user } = await signInWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    if (!user.emailVerified) {
      throw new EmailNotConfirmedError();
    }

    const idTokenResult = await user.getIdTokenResult();
    const timestamp = Number.isNaN(Number(idTokenResult.claims.exp))
      ? ((Date.now() + ONE_HOUR) as Timestamp)
      : (Number(idTokenResult.claims.exp) as Timestamp);

    return new Token(idTokenResult.token, timestamp);
  }

  async signUp(email: string, password: string): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    await sendEmailVerification(user);
  }

  async forgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(FirebaseService.clientAuth, email);
  }
}

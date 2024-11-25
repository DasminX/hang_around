import { Auth } from "firebase-admin/auth";

import { NotAuthenticatedError } from "../../errors";
import { TokenVerifierI, VerifyTokenResult } from "./abstract";

export class FirebaseTokenVerifier implements TokenVerifierI {
  constructor(private readonly _adminAuth: Auth) {}

  async verify(token: string): Promise<VerifyTokenResult> {
    try {
      return await this._adminAuth.verifyIdToken(token);
    } catch (error) {
      throw new NotAuthenticatedError();
    }
  }
}

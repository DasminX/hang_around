import { Auth } from "firebase-admin/auth";

import { NotAuthenticatedError } from "../../errors";
import { TokenVerifierI, VerifyTokenResult } from "./abstract";

export class FirebaseTokenVerifier implements TokenVerifierI {
  constructor(private readonly _adminAuth: Auth) {}

  async verify(token: string): Promise<VerifyTokenResult> {
    try {
      const userData = await this._adminAuth.verifyIdToken(token);
      return Object.assign(userData, { token });
    } catch (error) {
      throw new NotAuthenticatedError();
    }
  }
}

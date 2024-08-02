import { Auth, DecodedIdToken } from "firebase-admin/auth";

import { NotAuthenticatedError } from "../../errors";
import { TokenVerifierI } from "./abstract";

export class FirebaseTokenVerifier implements TokenVerifierI {
  constructor(private readonly adminAuth: Auth) {}

  async verify(token: string): Promise<DecodedIdToken> {
    const user = await this.adminAuth.verifyIdToken(token);
    if (!user) {
      throw new NotAuthenticatedError();
    }

    return user;
  }
}

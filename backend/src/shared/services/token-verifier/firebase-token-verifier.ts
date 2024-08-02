import { DecodedIdToken } from "firebase-admin/auth";

import { NotAuthenticatedError } from "../../errors";
import { FirebaseProvider } from "../../firebase-provider";
import { TokenVerifierI } from "./abstract";

export class FirebaseTokenVerifier implements TokenVerifierI {
  async verify(token: string): Promise<DecodedIdToken> {
    const user = await FirebaseProvider.adminAuth.verifyIdToken(token);
    if (!user) {
      throw new NotAuthenticatedError();
    }

    return user;
  }
}

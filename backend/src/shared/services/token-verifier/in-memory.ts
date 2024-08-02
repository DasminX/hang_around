import { randomUUID } from "crypto";

import { NotAuthenticatedError } from "../../errors";
import { TokenVerifierI, VerifyTokenResult } from "./abstract";

export class InMemoryTokenVerifier implements TokenVerifierI {
  async verify(token: string): Promise<VerifyTokenResult> {
    if (randomUUID().length == token.length) {
      return { uid: "VALID-AUTHENTICATED-UUID" };
    }

    throw new NotAuthenticatedError();
  }
}

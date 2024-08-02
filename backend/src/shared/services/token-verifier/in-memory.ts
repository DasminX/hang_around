import { TokenVerifierI, VerifyTokenResult } from "./abstract";

export class InMemoryTokenVerifier implements TokenVerifierI {
  async verify(token: string): Promise<VerifyTokenResult> {
    if (token) {
      return { uid: "VALID" };
    }

    return { uid: "INVALID" };
  }
}

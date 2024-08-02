export type VerifyTokenResult = { uid: string };

export interface TokenVerifierI {
  verify(token: string): Promise<VerifyTokenResult>;
}

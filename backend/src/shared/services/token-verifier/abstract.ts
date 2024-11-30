export type VerifyTokenResult = { uid: string; token: string };

export interface TokenVerifierI {
  verify(token: string): Promise<VerifyTokenResult>;
}

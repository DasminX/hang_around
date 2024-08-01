export interface TokenVerifierI {
  verify(token: string): Promise<{ uid: string }>;
}

export interface TokenVerifierI {
  verify(token: string): Promise<unknown>;
}

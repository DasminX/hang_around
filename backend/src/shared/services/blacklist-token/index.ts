export class BlacklistToken {
  private static tokens: Set<string> = new Set();

  public static add(token: string) {
    this.tokens.add(token);
  }

  public static isBlacklisted(token: string) {
    return this.tokens.has(token);
  }
}

export abstract class APIResponseSuccess {
  public readonly status = "ok";

  protected constructor(public readonly data: unknown = null) {}
}

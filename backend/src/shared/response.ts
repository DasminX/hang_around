export class APIResponseSuccess {
  public readonly status = "ok";

  constructor(public readonly data: unknown = {}) {}
}

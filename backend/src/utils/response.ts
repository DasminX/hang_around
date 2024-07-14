export class APIResponseSuccess {
  public readonly status = "ok";

  constructor(public readonly data: unknown = {}) {}
}

export class APIResponseError {
  public readonly status = "error";

  constructor(public readonly detail: unknown = {}) {}
}

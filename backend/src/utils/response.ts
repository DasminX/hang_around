export type ObjectOrNull = Record<string, unknown> | null | unknown; // TOFIX

export class APIResponseSuccess {
  public readonly status = "ok";

  constructor(public readonly data?: ObjectOrNull) {}
}

export class APIResponseError {
  public readonly status = "error";

  constructor(public readonly detail: ObjectOrNull) {}
}

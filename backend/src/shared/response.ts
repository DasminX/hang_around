enum Status {
  OK = "ok",
  ERROR = "error",
}

export class APIResponseSuccess {
  public readonly status = Status.OK;
  public readonly data: unknown;

  constructor(data: unknown = null) {
    this.data = data;
  }
}

export class APIResponseError {
  public readonly status = Status.ERROR;
  public readonly detail: unknown;

  constructor(detail: unknown = null) {
    this.detail = detail;
  }
}

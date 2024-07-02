export class APIResponse {
  public readonly status = "ok";
  public readonly data: unknown;

  constructor(data: unknown = null) {
    this.data = data;
  }
}

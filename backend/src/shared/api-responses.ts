import { APIResponseErrorI, APIResponseSuccessI, AppError } from "@dasminx/hang-around-contracts";

export abstract class APIResponseSuccess implements APIResponseSuccessI {
  public readonly status = "ok";

  protected constructor(public readonly data: unknown = null) {}
}

export class APIResponseError implements APIResponseErrorI {
  public readonly status = "fail";

  public constructor(public readonly error: AppError | Error) {}
}

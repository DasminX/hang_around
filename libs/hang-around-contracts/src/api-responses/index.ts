import { AppError } from "../errors";

export interface APIResponseSuccessI {
  readonly status: "ok";
  readonly data: unknown | null;
}

export interface APIResponseErrorI {
  readonly status: "fail";
  readonly error: AppError | Error;
}

import { StatusCodes } from "http-status-codes";

export abstract class AppError extends Error {
  protected constructor(
    message: string,
    public readonly httpCode: StatusCodes,
    public readonly errorCode: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    public readonly details: unknown = null
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}

export enum ErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  BAD_CREDENTIALS = "BAD_CREDENTIALS",
  NOT_FOUND = "NOT_FOUND",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
  EMAIL_NOT_CONFIRMED = "EMAIL_NOT_CONFIRMED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  TIMEOUT = "TIMEOUT",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  ACCOUNT_ALREADY_EXISTS = "ACCOUNT_ALREADY_EXISTS",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
}

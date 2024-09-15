import { StatusCodes } from "http-status-codes";
import { ErrorCode } from "../enums";

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

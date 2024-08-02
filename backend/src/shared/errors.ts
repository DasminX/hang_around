import { Request } from "express";
import { FirebaseError } from "firebase/app";
import { StatusCodes } from "http-status-codes";

import { isObjectWithAllProperties } from "../utils/functions";
import { FirebaseProvider } from "./firebase-provider";

export enum ErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  BAD_CREDENTIALS = "BAD_CREDENTIALS",
  NOT_FOUND = "NOT_FOUND",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
  EMAIL_NOT_CONFIRMED = "EMAIL_NOT_CONFIRMED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  TIMEOUT = "TIMEOUT",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export abstract class AppError extends Error {
  protected constructor(
    message: string,
    public readonly httpCode: StatusCodes,
    public readonly errorCode: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    public readonly details: unknown = {},
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}

export class DataSourceError extends AppError {
  constructor(pickedDataSource: string) {
    super(`Invalid datasource provided!`, StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_ERROR, {
      pickedDataSource,
    });
  }
}
export class NotFoundError extends AppError {
  constructor(url: Request["originalUrl"]) {
    super(`Can't find ${url} on this server!`, StatusCodes.NOT_FOUND, ErrorCode.NOT_FOUND);
  }
}

export class BadCredentialsError extends AppError {
  constructor() {
    super("Bad credentials provided!", StatusCodes.BAD_REQUEST, ErrorCode.BAD_CREDENTIALS);
  }
}

export class EmailNotConfirmedError extends AppError {
  constructor() {
    super("Email not confirmed!", StatusCodes.BAD_REQUEST, ErrorCode.EMAIL_NOT_CONFIRMED);
  }
}

export class NotAuthenticatedError extends AppError {
  constructor() {
    super("Not authenticated!", StatusCodes.FORBIDDEN, ErrorCode.NOT_AUTHENTICATED);
  }
}

export class PlacesFinderNotInitializedError extends AppError {
  constructor() {
    super("Places finder is not inialized!", StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.UNKNOWN_ERROR);
  }
}

export class PlacesFinderError extends AppError {
  constructor(detail: unknown) {
    super("Something went wrong in places finder.", StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.UNKNOWN_ERROR, detail);
  }
}

export class InputValidationError extends AppError {
  constructor(details: string[]) {
    super("Given inputs are invalid.", StatusCodes.BAD_REQUEST, ErrorCode.INPUT_VALIDATION_ERROR, details);
  }
}

export class TimeoutError extends AppError {
  constructor() {
    super("Connection timed out!", StatusCodes.REQUEST_TIMEOUT, ErrorCode.TIMEOUT);
  }
}

export class AppFirebaseError extends AppError {
  constructor(originalFirebaseError: FirebaseError) {
    const errMsg =
      FirebaseProvider.ERROR_MESSAGES[originalFirebaseError.code as keyof typeof FirebaseProvider.ERROR_MESSAGES] ||
      "Unknown error occured. Try again later.";
    super(errMsg, StatusCodes.BAD_REQUEST, ErrorCode.UNKNOWN_ERROR);
  }

  public static isFirebaseError(object: unknown): object is FirebaseError {
    return isObjectWithAllProperties(object, "message", "code");
  }
}

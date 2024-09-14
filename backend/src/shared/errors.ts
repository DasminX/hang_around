import { AppError, ErrorCode } from "@dasminx/hang-around-contracts";
import { Request } from "express";
import { FirebaseError } from "firebase/app";
import { StatusCodes } from "http-status-codes";

import { isObjectWithAllProperties } from "../utils/functions";
import { FirebaseProvider } from "./firebase-provider";
import { ZodIssueMessage } from "./validators/validate-zod-schema";

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
    super("Not authenticated!", StatusCodes.UNAUTHORIZED, ErrorCode.NOT_AUTHENTICATED);
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
  constructor(details: (string | ZodIssueMessage)[]) {
    super("Given inputs are invalid.", StatusCodes.BAD_REQUEST, ErrorCode.INPUT_VALIDATION_ERROR, details);
  }
}

export class TimeoutError extends AppError {
  constructor() {
    super("Connection timed out!", StatusCodes.REQUEST_TIMEOUT, ErrorCode.TIMEOUT);
  }
}

export class AccountAlreadyExistsError extends AppError {
  constructor() {
    super("Account already exists!", StatusCodes.CONFLICT, ErrorCode.ACCOUNT_ALREADY_EXISTS);
  }
}

export class AppFirebaseError extends AppError {
  constructor(originalFirebaseError: FirebaseError) {
    const errMsg =
      FirebaseProvider.ERROR_MESSAGES[originalFirebaseError.code as keyof typeof FirebaseProvider.ERROR_MESSAGES] ||
      "Unknown error occured. Try again later.";

    switch (originalFirebaseError.code) {
      case "auth/email-already-in-use":
        super(errMsg, StatusCodes.CONFLICT, ErrorCode.ACCOUNT_ALREADY_EXISTS);
        break;
      default:
        super(errMsg, StatusCodes.BAD_REQUEST, ErrorCode.UNKNOWN_ERROR);
    }
  }

  public static isFirebaseError(object: unknown): object is FirebaseError {
    return isObjectWithAllProperties(object, "message", "code");
  }
}

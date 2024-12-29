import { AppError, ErrorCode } from "@dasminx/hang-around-common";
import { Request } from "express";
import { FirebaseError } from "firebase/app";
import { StatusCodes } from "http-status-codes";

import { isObjectWithAllProperties } from "../utils/functions";
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

export class RequestLimitExceededError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.TOO_MANY_REQUESTS, ErrorCode.TOO_MANY_REQUESTS);
  }
}

export class AppFirebaseError extends AppError {
  constructor(originalFirebaseError: FirebaseError) {
    const errMsg =
      AppFirebaseError.ERROR_MESSAGES[originalFirebaseError.code as keyof typeof AppFirebaseError.ERROR_MESSAGES] ||
      "Firebase error code doesn't match with one provided...";

    switch (originalFirebaseError.code) {
      case "auth/email-already-in-use":
        super(errMsg, StatusCodes.CONFLICT, ErrorCode.ACCOUNT_ALREADY_EXISTS);
        break;
      case "auth/id-token-expired":
      case "auth/argument-error":
        super(errMsg, StatusCodes.UNAUTHORIZED, ErrorCode.NOT_AUTHENTICATED);
        break;
      case "auth/invalid-email":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        super(errMsg, StatusCodes.BAD_REQUEST, ErrorCode.BAD_CREDENTIALS);
        break;
      case "auth/user-disabled":
        super(errMsg, StatusCodes.NOT_FOUND, ErrorCode.NOT_FOUND);
        break;
      default:
        super(errMsg, StatusCodes.BAD_REQUEST, ErrorCode.UNKNOWN_ERROR);
    }
  }

  public static isFirebaseError(object: unknown): object is FirebaseError {
    return isObjectWithAllProperties(object, "message", "code");
  }

  private static get ERROR_MESSAGES() {
    return {
      "auth/invalid-email": "Invalid email provided!",
      "auth/user-disabled": "User account has been disabled!",
      "auth/user-not-found": "User not found!",
      "auth/wrong-password": "Invalid password provided!",
      "auth/invalid-credential": "Invalid credentials!",
      "auth/weak-password": "Password should be at least 6 characters long.",
      "auth/email-already-in-use": "Email is already in use!",
      "auth/id-token-expired": "Session expired! Sign in again.",
      "auth/argument-error": "Authorization token is invalid or malformed. Try again.",
      // "auth/requests-to-this-api-identitytoolkit-method-google.cloud.identitytoolkit.v1.authenticationservice.signinwithpassword-are-blocked.": "Your identityToolkit is not enabled."
    } as const;
  }
}

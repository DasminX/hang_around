import { FirebaseError } from "firebase/app";
import { isObjectAndContainsProperties } from "../utils/helpers";
import { FIREBASE_ERRORS } from "../utils/constants";
import { StatusCodes } from "http-status-codes";
import { Request } from "express";
import { ZodIssue } from "zod";

export enum ErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  BAD_CREDENTIALS = "BAD_CREDENTIALS",
  NOT_FOUND = "NOT_FOUND",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
  ALREADY_EXISTS_ERROR = "ALREADY_EXISTS_ERROR",
  EMAIL_NOT_CONFIRMED = "EMAIL_NOT_CONFIRMED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
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

export class WeakPasswordError extends AppError {
  constructor() {
    super(
      "Password too weak: must be at least 8 characters long and include uppercase letters, lowercase letters, digits, and special characters.",
      StatusCodes.BAD_REQUEST,
      ErrorCode.BAD_CREDENTIALS,
    );
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

export class FirebaseErrorCustom extends AppError {
  constructor(originalFirebaseError: FirebaseError) {
    const errMsg =
      FIREBASE_ERRORS[originalFirebaseError.code as keyof typeof FIREBASE_ERRORS] ||
      "Unknown error occured. Try again later.";
    super(errMsg, StatusCodes.BAD_REQUEST, ErrorCode.UNKNOWN_ERROR);
  }

  public static isFirebaseError(object: unknown): object is FirebaseError {
    return isObjectAndContainsProperties(object, "message", "code");
  }
}

import { NextFunction, Request, Response } from "express";
import { AppError, ErrorCode, FirebaseErrorCustom } from "./errors";
import { StatusCodes } from "http-status-codes";

export const errorController = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (FirebaseErrorCustom.isFirebaseError(err)) {
    // TODO
    err = new FirebaseErrorCustom(err);
  }

  if (err instanceof AppError) {
    return res.status(err.httpCode).json({
      errorCode: err.errorCode,
      message: err.message,
      details: err.details,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errorCode: ErrorCode.UNKNOWN_ERROR,
    message: err.message,
    name: err.name,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

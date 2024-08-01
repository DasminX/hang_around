import { StatusCodes } from "http-status-codes";

import { AppError, AppFirebaseError, ErrorCode } from "./shared/errors";
import { logger } from "./shared/logger";
import { ExpressMiddlewareErrorController } from "./utils/types";

export const errorController: ExpressMiddlewareErrorController = (err, _req, res, _next) => {
  if (AppFirebaseError.isFirebaseError(err)) {
    err = new AppFirebaseError(err);
  }

  const response = {
    name: err.name,
    errorCode: err instanceof AppError ? err.errorCode : ErrorCode.UNKNOWN_ERROR,
    message: err.message,
    details: err instanceof AppError ? err.details : undefined,
  };

  logger.error(`Error occurred...`, {
    ...response,
    stack: err.stack,
  });

  const code = err instanceof AppError ? err.httpCode : StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(code).json({
    ...response,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

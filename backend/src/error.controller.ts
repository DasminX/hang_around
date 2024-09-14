import { AppError } from "@dasminx/hang-around-contracts";
import { StatusCodes } from "http-status-codes";

import { APIResponseError } from "./shared/api-responses";
import { AppFirebaseError } from "./shared/errors";
import { logger } from "./shared/logger";
import { ExpressMiddlewareErrorController } from "./utils/types";

export const errorController: ExpressMiddlewareErrorController = (err, _req, res, _next) => {
  const orgError = { ...err };
  if (AppFirebaseError.isFirebaseError(err)) {
    err = new AppFirebaseError(err);
  }

  const response = new APIResponseError(err);

  logger.error(`Error occurred...`, {
    ...response.error,
    stack: err.stack,
    orgError,
  });

  const code = err instanceof AppError ? err.httpCode : StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(code).json({
    ...response,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

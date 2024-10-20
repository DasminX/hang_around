import { NextFunction, Request, Response } from "express";

import { DataSource } from "../data-source";
import { NotAuthenticatedError } from "../errors";

const isAuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getFromBearer(req.headers);
    if (!token) {
      throw new NotAuthenticatedError();
    }

    res.locals.user = await DataSource.tokenVerifier.verify(token);

    next();
  } catch (e) {
    next(e);
  }
};

const getFromBearer = (headers: Request["headers"]): string | null => {
  if (!headers.authorization?.startsWith("Bearer ")) {
    return null;
  }
  return headers.authorization.split(" ").at(-1) || null;
};

export { isAuthenticatedMiddleware as default, isAuthenticatedMiddleware };

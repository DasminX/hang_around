import { NextFunction, Request, Response } from "express";

import { NotAuthenticatedError } from "../errors";
import { FirebaseService } from "../firebase.service";

const isAuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getFromBearer(req.headers);
    if (!token) {
      throw new NotAuthenticatedError();
    }

    const userFromDecodedToken = await FirebaseService.adminAuth.verifyIdToken(token);
    if (!userFromDecodedToken) {
      res.locals.user = null;
      throw new NotAuthenticatedError();
    }

    res.locals.user = userFromDecodedToken;

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

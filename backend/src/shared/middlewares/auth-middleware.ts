import { NextFunction, Request, Response } from "express";

import { NotAuthenticatedError } from "../errors";
import { FirebaseTokenVerifier } from "../services/token-verifier/firebase-token-verifier";

const isAuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getFromBearer(req.headers);
    if (!token) {
      throw new NotAuthenticatedError();
    }

    res.locals.user = await new FirebaseTokenVerifier().verify(token);

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

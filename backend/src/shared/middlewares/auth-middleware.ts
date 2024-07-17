import { NextFunction, Request, Response } from "express";
import { FirebaseService } from "../firebase.service";
import { NotAuthenticatedError } from "../errors";

const isAuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getFromBearer(req.headers);
    if (!token) {
      throw new NotAuthenticatedError();
    }

    const userFromDecodedToken = await FirebaseService.adminAuth.verifyIdToken(token);
    if (!userFromDecodedToken) {
      throw new NotAuthenticatedError();
    }

    res.locals.user = userFromDecodedToken;
    // console.log(userFromDecodedToken); // TODO LATER potrzebne do zapisania w redis

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

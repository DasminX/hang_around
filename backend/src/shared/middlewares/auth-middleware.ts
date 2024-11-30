import { NextFunction, Request, Response } from "express";

import { BlacklistToken } from "../blacklist-token";
import { DataSource } from "../data-source";
import { NotAuthenticatedError } from "../errors";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getFromBearer(req.headers);
    if (!token || BlacklistToken.isBlacklisted(token)) {
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

export { authMiddleware, authMiddleware as default };

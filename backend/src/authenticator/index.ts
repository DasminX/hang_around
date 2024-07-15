import { NextFunction, Request, Response } from "express";
import { FirebaseService } from "../shared/firebaseService";
import { NotAuthenticatedError } from "../shared/errors";
import { AUTH_TOKEN_COOKIE_NAME } from "../utils/constants";

export class Authenticator {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      const token = Authenticator.getBearer(req.headers) ?? Authenticator.getFromCookie(req.cookies) ?? null;
      if (!token) {
        throw new NotAuthenticatedError();
      }

      const userFromDecodedToken = await FirebaseService.adminAuth.verifyIdToken(token);
      if (!userFromDecodedToken) {
        throw new NotAuthenticatedError();
      }

      console.log(userFromDecodedToken); // TODO potrzebne do zapisania w redis

      next();
    } catch (e) {
      next(e);
    }
  }

  private static getBearer(headers: Request["headers"]): string | null {
    if (!headers.authorization?.startsWith("Bearer ")) {
      return null;
    }
    return headers.authorization.split(" ").at(-1) || null;
  }

  private static getFromCookie(cookies: Request["cookies"]): string | null {
    return cookies[AUTH_TOKEN_COOKIE_NAME] || null;
  }
}

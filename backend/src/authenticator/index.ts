import { NextFunction, Request, Response } from "express";
import { FirebaseService } from "../shared/firebaseService";
import { AppError } from "../shared/errors";
import { AUTH_TOKEN_COOKIE_NAME } from "../utils/constants";
import { FirebaseErrorAdapter } from "../shared/adapters";
import { FirebaseError } from "firebase/app";

export class Authenticator {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      const token = Authenticator.getBearer(req.headers) ?? Authenticator.getFromCookie(req.cookies) ?? null;
      if (!token) {
        throw new AppError("Not authenticated!", 403);
      }

      const decodedIdToken = await FirebaseService.adminAuth.verifyIdToken(token);
      if (!decodedIdToken) {
        throw new AppError("Not authenticated!", 403);
      }

      console.log(decodedIdToken); // TODO potrzebne do zapisania w redis

      next();
    } catch (e) {
      if (FirebaseErrorAdapter.isFirebaseError(e)) {
        const firebaseError = new FirebaseErrorAdapter(e as FirebaseError);
        return next(new AppError(firebaseError.message, firebaseError.statusCode));
      }
      return next(e);
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

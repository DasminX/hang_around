import { NextFunction, Request, Response } from "express";
import { FirebaseService } from "../shared/firebaseService";
import { AppError } from "../shared/errors";

// TESt
import fs from "fs";
import { AUTH_TOKEN_COOKIE_NAME } from "../utils/constants";

// To be implemented!
export class Authenticator {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = Authenticator.getBearer(req.headers) ?? Authenticator.getFromCookie(req.cookies) ?? null;
    console.log(token);
    if (!token) {
      return next(new AppError("Not authenticated!", 403));
    }

    const decodedIdToken = await FirebaseService.adminAuth.verifyIdToken(token);
    if (!decodedIdToken) {
      return next(new AppError("Not authenticated!", 403));
    }

    console.log(decodedIdToken);

    next();
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

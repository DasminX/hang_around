import { NextFunction, Request, Response } from "express";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FirebaseService } from "../shared/firebaseService";
import { APIResponseSuccess } from "../utils/response";
import { isPasswordStrongEnough } from "./utils";
import { AppError } from "../shared/errors";
import { FirebaseErrorAdapter } from "../shared/adapters";

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Credentials not provided", 400);
    }

    const { user } = await signInWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    if (!user.emailVerified) {
      throw new AppError("Email not verified!", 400);
    }

    return res.json(new APIResponseSuccess(await user.getIdTokenResult())); // TOFIX wrap with object and remove in frontend instead
  } catch (e) {
    if (FirebaseErrorAdapter.isFirebaseError(e)) {
      const firebaseError = new FirebaseErrorAdapter(e as FirebaseError);
      return next(new AppError(firebaseError.message, firebaseError.statusCode));
    }

    return next(e);
  }
};

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Wrong email or password", 400);
    }

    if (isPasswordStrongEnough(password)) {
      throw new AppError(
        "Password too weak: must be at least 8 characters long and include uppercase letters, lowercase letters, digits, and special characters.",
        400
      );
    }

    const { user } = await createUserWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    await sendEmailVerification(user);

    return res.json(new APIResponseSuccess());
  } catch (e) {
    if (FirebaseErrorAdapter.isFirebaseError(e)) {
      const firebaseError = new FirebaseErrorAdapter(e as FirebaseError);
      return next(new AppError(firebaseError.message, firebaseError.statusCode));
    }

    return next(e);
  }
};

/* TODO firebase forgot password */

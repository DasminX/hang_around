import { NextFunction, Request, Response } from "express";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { isFirebaseError } from "../utils/helpers";
import { AppError } from "../utils/appError";
import { FirebaseService } from "../utils/firebaseInitializer";
import { FirebaseErrorAdapter } from "./adapters/firebaseError";
import { APIResponseSuccess } from "../shared/response";

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Credentials not provided", 400));
    }

    const { user } = await signInWithEmailAndPassword(
      FirebaseService.getAuth(),
      email,
      password
    );

    if (!user.emailVerified) {
      return next(new AppError("Email not verified!", 400));
    }

    const result = await user.getIdTokenResult();

    return res.json(new APIResponseSuccess(result));
  } catch (e) {
    if (isFirebaseError(e)) {
      const firebaseError = new FirebaseErrorAdapter(e as FirebaseError);
      return next(
        new AppError(firebaseError.message, firebaseError.statusCode)
      );
    }

    return next(e);
  }
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Wrong email or password", 400));
    }

    const { user } = await createUserWithEmailAndPassword(
      FirebaseService.getAuth(),
      email,
      password
    );

    // TODO firebase zmienic warunki weak password
    await sendEmailVerification(user);

    return res.json(new APIResponseSuccess());
  } catch (e) {
    if (isFirebaseError(e)) {
      const firebaseError = new FirebaseErrorAdapter(e as FirebaseError);
      return next(
        new AppError(firebaseError.message, firebaseError.statusCode)
      );
    }

    return next(e);
  }
};

/* TODO firebase forgot password */

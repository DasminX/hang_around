import { NextFunction, Request, Response } from "express";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseService } from "../shared/firebaseService";
import { isPasswordStrongEnough, SignInResponse, SignOutResponse, SignUpResponse } from "./utils";
import { EmailNotConfirmedError, WeakPasswordError } from "../shared/errors";
import { parseInputBySchema } from "../shared/validateZodSchema";
import { RESET_PASSWORD_SCHEMA, SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } from "./schema";

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = parseInputBySchema(req.body, SIGN_IN_SCHEMA);

    const { user } = await signInWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    if (!user.emailVerified) {
      throw new EmailNotConfirmedError();
    }

    return res.json(new SignInResponse(await user.getIdTokenResult()));
  } catch (e) {
    next(e);
  }
};

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = parseInputBySchema(req.body, SIGN_UP_SCHEMA);

    if (!isPasswordStrongEnough(password)) {
      throw new WeakPasswordError();
    }

    const { user } = await createUserWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    await sendEmailVerification(user);

    return res.json(new SignUpResponse());
  } catch (e) {
    next(e);
  }
};

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = parseInputBySchema(req.body, RESET_PASSWORD_SCHEMA);

    await sendPasswordResetEmail(FirebaseService.clientAuth, email);

    return res.json(new SignUpResponse());
  } catch (e) {
    next(e);
  }
};

export const signOutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(new SignOutResponse());
  } catch (e) {
    next(e);
  }
};

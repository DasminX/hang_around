import { NextFunction, Request, Response } from "express";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FirebaseService } from "../shared/firebaseService";
import { isPasswordStrongEnough, SignInResponse, SignUpResponse } from "./utils";
import { BadCredentialsError, EmailNotConfirmedError, WeakPasswordError } from "../shared/errors";

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadCredentialsError();
    }

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
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadCredentialsError();
    }

    if (isPasswordStrongEnough(password)) {
      throw new WeakPasswordError();
    }

    const { user } = await createUserWithEmailAndPassword(FirebaseService.clientAuth, email, password);

    await sendEmailVerification(user);

    return res.json(new SignUpResponse());
  } catch (e) {
    next(e);
  }
};

/* TODO firebase forgot password */

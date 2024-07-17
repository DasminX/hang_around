import { Request, Response } from "express";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseService } from "../shared/firebase.service";
import { SignInResponse, SignOutResponse, SignUpResponse, ResetPasswordResponse } from "./responses";
import { isPasswordStrongEnough } from "./utils/functions";
import { EmailNotConfirmedError, WeakPasswordError } from "../shared/errors";
import { RESET_PASSWORD_SCHEMA, SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } from "./schema";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_IN_SCHEMA);

  const { user } = await signInWithEmailAndPassword(FirebaseService.clientAuth, email, password);

  if (!user.emailVerified) {
    throw new EmailNotConfirmedError();
  }

  return res.json(new SignInResponse(await user.getIdTokenResult()));
};

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_UP_SCHEMA);

  if (!isPasswordStrongEnough(password)) {
    throw new WeakPasswordError();
  }

  const { user } = await createUserWithEmailAndPassword(FirebaseService.clientAuth, email, password);

  await sendEmailVerification(user);

  return res.json(new SignUpResponse());
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { email } = parseInputBySchemaOrThrow(req.body, RESET_PASSWORD_SCHEMA);

  await sendPasswordResetEmail(FirebaseService.clientAuth, email);

  return res.json(new ResetPasswordResponse());
};

export const signOutController = async (_req: Request, res: Response) => {
  return res.json(new SignOutResponse());
};

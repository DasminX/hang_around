import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseService } from "../shared/firebase.service";
import { SignInResponse, SignOutResponse, SignUpResponse, ResetPasswordResponse } from "./responses";
import { EmailNotConfirmedError } from "../shared/errors";
import { RESET_PASSWORD_SCHEMA, SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } from "./schema";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";

export const signinController: ExpressMiddlewareCaught = async (req, res) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_IN_SCHEMA);

  const { user } = await signInWithEmailAndPassword(FirebaseService.clientAuth, email, password);

  if (!user.emailVerified) {
    throw new EmailNotConfirmedError();
  }

  return res.json(new SignInResponse(await user.getIdTokenResult()));
};

export const signupController: ExpressMiddlewareCaught = async (req, res) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_UP_SCHEMA);

  const { user } = await createUserWithEmailAndPassword(FirebaseService.clientAuth, email, password);

  await sendEmailVerification(user);

  return res.json(new SignUpResponse());
};

export const resetPasswordController: ExpressMiddlewareCaught = async (req, res) => {
  const { email } = parseInputBySchemaOrThrow(req.body, RESET_PASSWORD_SCHEMA);

  await sendPasswordResetEmail(FirebaseService.clientAuth, email);

  return res.json(new ResetPasswordResponse());
};

export const signOutController: ExpressMiddlewareCaught = async (_req, res) => {
  return res.json(new SignOutResponse());
};

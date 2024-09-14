import { StatusCodes } from "http-status-codes";

import { DataSource } from "../shared/data-source";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { ResetPasswordResponse, SignInResponse, SignOutResponse, SignUpResponse } from "./responses";
import { RESET_PASSWORD_SCHEMA, SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } from "./schema";

export const signinController: ExpressMiddlewareCaught = async (req, res) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_IN_SCHEMA);

  const token = await DataSource.auth.signIn(email, password);

  return res.status(StatusCodes.OK).json(new SignInResponse(token));
};

export const signupController: ExpressMiddlewareCaught = async (req, res) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_UP_SCHEMA);

  await DataSource.auth.signUp(email, password);

  return res.status(StatusCodes.CREATED).json(new SignUpResponse());
};

export const resetPasswordController: ExpressMiddlewareCaught = async (req, res) => {
  const { email } = parseInputBySchemaOrThrow(req.body, RESET_PASSWORD_SCHEMA);

  await DataSource.auth.resetPassword(email);

  return res.status(StatusCodes.OK).json(new ResetPasswordResponse());
};

// TODO blacklist tokens
export const signOutController: ExpressMiddlewareCaught = async (_req, res) => {
  await DataSource.auth.signOut();

  return res.status(StatusCodes.OK).json(new SignOutResponse());
};

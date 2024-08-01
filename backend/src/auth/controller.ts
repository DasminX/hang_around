import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { ResetPasswordResponse, SignInResponse, SignOutResponse, SignUpResponse } from "./responses";
import { RESET_PASSWORD_SCHEMA, SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } from "./schema";
import { AuthFirebase } from "./services/auth-database/firebase";

export const signinController: ExpressMiddlewareCaught = async (req, res) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_IN_SCHEMA);

  const token = await new AuthFirebase().signIn(email, password);

  return res.json(new SignInResponse(token));
};

export const signupController: ExpressMiddlewareCaught = async (req, res) => {
  const { email, password } = parseInputBySchemaOrThrow(req.body, SIGN_UP_SCHEMA);

  await new AuthFirebase().signUp(email, password);

  return res.json(new SignUpResponse());
};

export const resetPasswordController: ExpressMiddlewareCaught = async (req, res) => {
  const { email } = parseInputBySchemaOrThrow(req.body, RESET_PASSWORD_SCHEMA);

  await new AuthFirebase().forgotPassword(email);

  return res.json(new ResetPasswordResponse());
};

// TODO blacklist tokens
export const signOutController: ExpressMiddlewareCaught = async (_req, res) => {
  return res.json(new SignOutResponse());
};

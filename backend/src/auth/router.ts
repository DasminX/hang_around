import { handleOrThrowTimeoutError } from "./../shared/middlewares/http-timeout";
import express from "express";
import { resetPasswordController, signinController, signOutController, signupController } from "./controller";
import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";
import { catchAsync } from "./../shared/catch-async";

const router = express.Router();

router.route("/signin").post(catchAsync(handleOrThrowTimeoutError(signinController)));
router.route("/signup").post(catchAsync(handleOrThrowTimeoutError(signupController)));
router.route("/reset-password").post(catchAsync(handleOrThrowTimeoutError(resetPasswordController)));

// isAuthenticatedMiddleware is checked in "signout" for having res.locals.user in signOutController - there I can revoke the token for the user
router.route("/signout").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(signOutController)));

export default router;

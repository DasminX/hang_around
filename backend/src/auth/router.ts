import express from "express";

import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";
import { catchAsync } from "../shared/http-wrappers/catch-async";
import { handleOrThrowTimeoutError } from "../shared/http-wrappers/http-timeout";
import { resetPasswordController, signinController, signOutController, signupController } from "./controller";

const router = express.Router();

router.route("/signin").post(catchAsync(handleOrThrowTimeoutError(signinController)));
router.route("/signup").post(catchAsync(handleOrThrowTimeoutError(signupController)));
router.route("/reset-password").post(catchAsync(handleOrThrowTimeoutError(resetPasswordController)));
router.route("/signout").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(signOutController)));

export default router;

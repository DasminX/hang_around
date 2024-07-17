import express from "express";
import { resetPasswordController, signinController, signOutController, signupController } from "./controller";
import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";
import { catchAsync } from "./../shared/catch-async";

const router = express.Router();

router.route("/signin").post(catchAsync(signinController));
router.route("/signup").post(catchAsync(signupController));
router.route("/reset-password").post(catchAsync(resetPasswordController));

// isAuthenticatedMiddleware is checked in "signout" for having res.locals.user in signOutController - there I can revoke the token for the user
router.route("/signout").get(isAuthenticatedMiddleware, catchAsync(signOutController));

export default router;

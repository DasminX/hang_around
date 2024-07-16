import express from "express";
import { resetPasswordController, signinController, signOutController, signupController } from "./controller";
import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";

const router = express.Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);
router.route("/reset-password").post(resetPasswordController);

// isAuthenticatedMiddleware is checked in "signout" for having res.locals.user in signOutController - there I can revoke the token for the user
router.route("/signout").get(isAuthenticatedMiddleware, signOutController);

export default router;

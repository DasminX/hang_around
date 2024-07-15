import express from "express";
import { resetPasswordController, signinController, signOutController, signupController } from "./controller";
import { Authenticator } from "../authenticator";

const router = express.Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);
router.route("/reset-password").post(resetPasswordController);

// isAuthenticated is checked in "signout" for having res.locals.user in signOutController - there I can revoke the token for the user
router.route("/signout").get(Authenticator.isAuthenticated, signOutController);

export default router;

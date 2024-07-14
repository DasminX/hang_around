import express from "express";
import { resetPasswordController, signinController, signupController } from "./controller";

const router = express.Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);
router.route("/reset-password").post(resetPasswordController);

export default router;

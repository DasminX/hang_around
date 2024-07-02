import express from "express";
import { signinController, signupController } from "./controller";

const router = express.Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);

export default router;

import express from "express";
import authRouter from "./auth/router";
import healthCheckRouter from "./utils/healthcheckRouter";
import findPlacesRouter from "./findplaces/router";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/auth", authRouter);
router.use("/findplaces", findPlacesRouter);

export default router;

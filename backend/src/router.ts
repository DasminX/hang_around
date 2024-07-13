import express from "express";
import healthCheckRouter from "./healthcheck/router";
import authRouter from "./auth/router";
import placesRouter from "./places/router";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/auth", authRouter);
router.use("/places", placesRouter);

export default router;

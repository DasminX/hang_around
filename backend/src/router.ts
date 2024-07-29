import express from "express";
import healthCheckRouter from "./healthcheck/router";
import authRouter from "./auth/router";
import placesRouter from "./places/router";
import visitsRouter from "./visits/router";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/auth", authRouter);
router.use("/places", placesRouter);
router.use("/visits", visitsRouter);

export default router;

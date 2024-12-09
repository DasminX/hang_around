import express from "express";

import authRouter from "./features/auth/router";
import healthCheckRouter from "./features/healthcheck/router";
import placesRouter from "./features/places/router";
import visitsRouter from "./features/visits/router";

export const getMainRouter = async () => {
  const router = express.Router();

  router.use("/healthcheck", healthCheckRouter);
  router.use("/auth", authRouter);
  router.use("/places", placesRouter);
  router.use("/visits", visitsRouter);

  return router;
};

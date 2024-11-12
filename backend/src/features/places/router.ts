import express from "express";

import { catchAsync } from "../../shared/http-wrappers/catch-async";
import { handleOrThrowTimeoutError } from "../../shared/http-wrappers/http-timeout";
import authMiddleware from "../../shared/middlewares/auth-middleware";
import { findPlacesController } from "./controller";
import { placesRateLimiter } from "./middlewares/places-rate-limiter";

const router = express.Router();

router
  .route("/find")
  .post(authMiddleware, placesRateLimiter, catchAsync(handleOrThrowTimeoutError(findPlacesController)));

export default router;

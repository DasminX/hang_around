import express from "express";

import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";
import { handleOrThrowTimeoutError } from "../shared/middlewares/http-timeout";
import { catchAsync } from "./../shared/catch-async";
import { findPlacesController } from "./controller";
import { placesRateLimiter } from "./middlewares/places-rate-limiter";

const router = express.Router();

router
  .route("/find")
  .post(isAuthenticatedMiddleware, placesRateLimiter, catchAsync(handleOrThrowTimeoutError(findPlacesController)));

export default router;

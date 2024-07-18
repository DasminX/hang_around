import express from "express";
import { findPlacesController } from "./controller";
import { placesRateLimiter } from "./middlewares/places-rate-limiter";
import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";
import { catchAsync } from "./../shared/catch-async";
import { handleOrThrowTimeoutError } from "../shared/middlewares/http-timeout";

const router = express.Router();

router
  .route("/find")
  .post(isAuthenticatedMiddleware, placesRateLimiter, catchAsync(handleOrThrowTimeoutError(findPlacesController)));

export default router;

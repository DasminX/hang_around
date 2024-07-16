import express from "express";
import { findPlacesController } from "./controller";
import { placesRateLimiter } from "./middlewares/places-rate-limiter";
import { isAuthenticatedMiddleware } from "../shared/middlewares/auth-middleware";

const router = express.Router();

router.route("/find").post(isAuthenticatedMiddleware, placesRateLimiter, findPlacesController);

export default router;

import { Router as getRouter } from "express";
import { findPlaces } from "./controller";
import { placesRateLimiter } from "./middlewares/places-rate-limiter";
import isAuthenticated from "../shared/middlewares/auth-middleware";

const router = getRouter();

router.route("/find").post(isAuthenticated, placesRateLimiter(), findPlaces);

export default router;

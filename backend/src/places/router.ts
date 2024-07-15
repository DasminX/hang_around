import { Router as getRouter } from "express";
import { findPlaces } from "./controller";
import { Authenticator } from "../authenticator";
import { getPlacesRateLimiter } from "./places-rate-limiter";

const router = getRouter();

router.route("/find").post(Authenticator.isAuthenticated, getPlacesRateLimiter(), findPlaces);

export default router;

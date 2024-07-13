import { Router as getRouter } from "express";
import { findPlaces } from "./controller";
// import { Authenticator } from "../authenticator";

const router = getRouter();

router.route("/find").post(/* Authenticator.isAuthenticated ,*/ findPlaces);

export default router;

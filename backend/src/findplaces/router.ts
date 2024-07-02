import { Router as getRouter } from "express";
import { findPlaces } from "./controller";

const router = getRouter();

router.route("/").post(findPlaces);

export default router;

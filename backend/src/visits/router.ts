import express from "express";

import { catchAsync } from "../shared/catch-async";
import isAuthenticatedMiddleware from "../shared/middlewares/auth-middleware";
import { handleOrThrowTimeoutError } from "../shared/middlewares/http-timeout";
import { createVisit, getVisit, getVisitsForAuthUser } from "./controller";

const router = express.Router();

router.route("/").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getVisitsForAuthUser)));
router.route("/:id").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getVisit)));
router.route("/").post(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(createVisit)));

// router.route("/").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getAllVisits))); // TODO add role
// router.route("/user/:userid").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getAllUserVisits)));

export default router;

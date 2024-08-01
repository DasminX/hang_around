import express from "express";

import { catchAsync } from "../shared/http-wrappers/catch-async";
import isAuthenticatedMiddleware from "../shared/middlewares/auth-middleware";
import { handleOrThrowTimeoutError } from "../shared/http-wrappers/http-timeout";
import { createVisit, getVisit, getVisitsForAuthUser } from "./controller";

const router = express.Router();

router.route("/").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getVisitsForAuthUser)));
router.route("/:id").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getVisit)));
router.route("/").post(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(createVisit)));

export default router;

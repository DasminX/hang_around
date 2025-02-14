import express from "express";

import { catchAsync } from "../../shared/http-wrappers/catch-async";
import { handleOrThrowTimeoutError } from "../../shared/http-wrappers/http-timeout";
import authMiddleware from "../../shared/middlewares/auth-middleware";
import { createVisit, getUserVisitById, getUserVisits } from "./controller";

const router = express.Router();

router.route("/").get(authMiddleware, catchAsync(handleOrThrowTimeoutError(getUserVisits)));
router.route("/:id").get(authMiddleware, catchAsync(handleOrThrowTimeoutError(getUserVisitById)));
router.route("/").post(authMiddleware, catchAsync(handleOrThrowTimeoutError(createVisit)));

export default router;

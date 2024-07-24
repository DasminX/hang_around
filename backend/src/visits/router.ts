import express from "express";
import isAuthenticatedMiddleware from "../shared/middlewares/auth-middleware";
import { catchAsync } from "../shared/catch-async";
import { handleOrThrowTimeoutError } from "../shared/middlewares/http-timeout";
import { getAllUserVisits, getAllVisits, getVisit } from "./controller";

const router = express.Router();

router.route("/").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getAllVisits)));

router.route("/:visitid").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getVisit)));

router.route("/user/:userid").get(isAuthenticatedMiddleware, catchAsync(handleOrThrowTimeoutError(getAllUserVisits)));

export default router;

import { ONE_HOUR } from "@dasminx/hang-around-common";
import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

import { RequestLimitExceededError } from "../../../shared/errors";

export const placesRateLimiter = rateLimit({
  limit: process.env.HA_APP_DATA_SOURCE === "IN_MEMORY" ? 5 : 10,
  windowMs: ONE_HOUR,
  keyGenerator: (req: Request, res: Response) => res.locals.user?.uid ?? req.headers["x-forwarded-for"] ?? req.ip,
  handler: (_req, _res, next) =>
    next(
      new RequestLimitExceededError(
        "Too many requests from this user and/or IP for finding place, please try again in an hour!",
      ),
    ),
});

import { ONE_HOUR } from "@dasminx/hang-around-common";
import rateLimit from "express-rate-limit";

import { RequestLimitExceededError } from "../errors";

export const globalRateLimiter = rateLimit({
  limit: 100,
  windowMs: ONE_HOUR,
  handler: (_req, _res, next) =>
    next(new RequestLimitExceededError("Too many requests from this IP, please try again in an hour!")),
});

import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { ONE_HOUR } from "../../utils/constants";

export const placesRateLimiter = rateLimit({
  limit: 5,
  windowMs: ONE_HOUR,
  message: "Too many requests from this user and/or IP for finding place, please try again in an hour!",
  keyGenerator: (req: Request, res: Response) => res.locals.user?.uid ?? req.ip,
});

import rateLimit from "express-rate-limit";
import { ONE_HOUR } from "../../utils/constants";

export const globalRateLimiter = rateLimit({
  limit: 100,
  windowMs: ONE_HOUR,
  message: "Too many requests from this IP, please try again in an hour!",
});

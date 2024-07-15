import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

import mainRouter from "./router";
import { NotFoundError } from "./shared/errors";
import { errorController } from "./shared/errorController";
import { getGlobalRateLimiter } from "./shared/global-rate-limiter";
import { loggerMiddleware } from "./shared/logger";

export const getNodeApp = () => {
  const app = express();

  app.options("*", cors());
  app.use(helmet());
  app.use(cookieParser());

  app.use(loggerMiddleware());
  app.use(getGlobalRateLimiter());

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(compression());

  app.use("/api/v1", mainRouter);

  app.all("*", (req, _res, next) => {
    next(new NotFoundError(req.originalUrl));
  });

  app.use(errorController);

  return app;
};

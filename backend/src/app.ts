import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

import mainRouter from "./router";
import { NotFoundError } from "./shared/errors";
import { errorController } from "./shared/error.controller";
import { globalRateLimiter } from "./shared/middlewares/global-rate-limiter";
import { httpLevelLoggerMiddleware } from "./shared/middlewares/http-level-logger-middleware";
import { API_VERSION } from "./utils/constants";

export const getNodeApp = () => {
  const app = express();

  app.options("*", cors());
  app.use(helmet());
  app.use(cookieParser());

  app.use(httpLevelLoggerMiddleware());
  app.use(globalRateLimiter());

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(compression());

  app.use(`/api/${API_VERSION}`, mainRouter);

  app.all("*", (req, _res, next) => {
    next(new NotFoundError(req.originalUrl));
  });

  app.use(errorController);

  return app;
};

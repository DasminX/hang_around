import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { errorController } from "./error.controller";
import mainRouter from "./router";
import { DataSource } from "./shared/data-source";
import { NotFoundError } from "./shared/errors";
import { logger } from "./shared/logger";
import { globalRateLimiter } from "./shared/middlewares/global-rate-limiter";
import { httpLevelLoggerMiddleware } from "./shared/middlewares/http-level-logger-middleware";
import { API_PREFIX } from "./utils/constants";

export const getNodeApp = () => {
  try {
    DataSource.setup();
    logger.info("Datasource set up.");
  } catch (err) {
    logger.error(`Server error while initializing dependencies...`, err);
    process.exit(1);
  }

  const app = express();

  app.options("*", cors());
  app.use(helmet());
  app.use(cookieParser());

  app.use(httpLevelLoggerMiddleware);
  app.use(globalRateLimiter);

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(compression());

  app.use(API_PREFIX, mainRouter);

  app.all("*", (req, _res, next) => next(new NotFoundError(req.originalUrl)));

  app.use(errorController);

  return app;
};

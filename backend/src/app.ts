import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { AppError, NotFoundError } from "./shared/errors";
import mainRouter from "./router";
import cookieParser from "cookie-parser";
import { errorController } from "./shared/errorController";

export const getNodeApp = () => {
  const app = express();

  app.options("*", cors());
  app.use(helmet());
  app.use(cookieParser());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  });

  app.use(limiter);

  app.use(express.json({ limit: "10kb" }));
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  app.use(compression());

  app.use("/api/v1", mainRouter);

  app.all("*", (req, _res, next) => {
    next(new NotFoundError(req.originalUrl));
  });

  app.use(errorController);

  return app;
};

import winston from "winston";
import morgan from "morgan";
import "winston-daily-rotate-file";

export class Logger {
  protected constructor() {}

  public static initialize() {}
}

export const logger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: "./_logs/combined/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
    }),
    new winston.transports.DailyRotateFile({
      filename: "./_logs/errors/errors-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      level: "error",
    }),
  ],
});

export const loggerMiddleware = () =>
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  });

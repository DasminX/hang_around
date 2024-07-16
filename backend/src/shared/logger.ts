import winston from "winston";
import "winston-daily-rotate-file";

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

import "winston-daily-rotate-file";

import winston from "winston";

// TODO LATER do zrobienia jako funkcja, która robi inne transportery w zależności od node_env? a moze na sztywno tutaj? do przemyślenia
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

import { getNodeApp } from "./app";
import { logger } from "./shared/logger";
import { loadEnvConfig } from "./utils/config";

(() => {
  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught exception: ${err.toString()}`, err);
    process.exit(1);
  });

  loadEnvConfig();

  const port = process.env.PORT || 3000;
  const server = getNodeApp().listen(port, () => {
    logger.info(`App running on port ${port}...`);
  });

  process.on("unhandledRejection", (err) => {
    if (err) {
      logger.error(`Unhandled rejection: ${err.toString()}`, err);
    }
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    logger.error(`SIGTERM received...`);

    server.close(() => {
      logger.error(`Process terminated.`);
    });
  });
})();

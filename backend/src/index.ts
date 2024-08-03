import { getNodeApp } from "./app";
import { DataSource } from "./shared/data-source";
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
    try {
      DataSource.setup();
      logger.info(`App running on port ${port}...`);
    } catch (e) {
      logger.error(`Server error while initializing dependencies...`, e);
      process.exit(1);
    }
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

import { getNodeApp } from "./app";
import { PlacesFinder } from "./places/finder";
import { FirebaseService } from "./shared/firebase.service";
import { logger } from "./shared/logger";
import { loadConfig } from "./utils/config";

(() => {
  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught exception: ${err.toString()}`, err);
    process.exit(1);
  });

  loadConfig();

  const port = process.env.PORT || 3000;
  const server = getNodeApp().listen(port, () => {
    try {
      FirebaseService.initialize();
      PlacesFinder.initialize();
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

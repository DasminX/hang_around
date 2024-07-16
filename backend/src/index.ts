import { getNodeApp } from "./app";
import { FirebaseService } from "./shared/firebase.service";
import { logger } from "./shared/logger";
import { loadConfig } from "./utils/config";

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught exception: ${err.toString()}`, err);
  process.exit(1);
});

loadConfig();

const port = process.env.PORT || 3000;
const server = getNodeApp().listen(port, () => {
  try {
    FirebaseService.initialize();
  } catch (e) {
    logger.error(`Server is starting: Error while initializing dependencies...`, e);
  } finally {
    logger.info(`App running on port ${port}...`);
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

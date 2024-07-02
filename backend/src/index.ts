import path from "path";
import dotenv from "dotenv";
import { initializeDependencies } from "./utils/dependenciesInitializer";
import { getNodeApp } from "./app";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = getNodeApp();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  try {
    initializeDependencies();
  } catch (e) {
    console.log(`Error while initializing dependencies...`, e);
  } finally {
    console.log(`App running on port ${port}...`);
  }
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});

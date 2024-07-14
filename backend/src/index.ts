import path from "path";
import dotenv from "dotenv";
import { getNodeApp } from "./app";
import { FirebaseService } from "./shared/firebaseService";

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
    FirebaseService.initialize();
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

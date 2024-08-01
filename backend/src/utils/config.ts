import dotenv from "dotenv";
import path from "path";

export const loadEnvConfig = () => dotenv.config({ path: path.join(process.cwd(), ".env") });

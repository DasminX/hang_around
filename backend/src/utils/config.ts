import path from "path";
import dotenv from "dotenv";

export const loadConfig = () => dotenv.config({ path: path.join(process.cwd(), ".env") });

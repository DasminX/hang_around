import dotenv from "dotenv";
import path from "path";

export const loadConfig = () => dotenv.config({ path: path.join(process.cwd(), ".env") });

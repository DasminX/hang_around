import express from "express";
import { glob } from "glob";
import path from "path";

import { logger } from "./shared/logger";

export const getMainRouter = async () => {
  const router = express.Router();

  const subRoutersPaths = await glob("src/features/**/router.ts");

  for (const subpath of subRoutersPaths) {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    try {
      const featureRouter = await import(path.resolve(process.cwd(), subpath));
      const featureName = subpath.replace(/^src[/\\]features[/\\]/, "").replace(/[\\/]router\.ts$/, "");

      router.use(`/${featureName}`, featureRouter.default);
    } catch (error) {
      logger.error("An error occured", error);
    }
  }

  return router;
};

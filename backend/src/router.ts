import express from "express";
import fs from "fs";
import path from "path";

export const getMainRouter = () => {
  const router = express.Router();

  const subRoutersPaths = fs.globSync("src/features/**/router.ts");

  for (const subpath of subRoutersPaths) {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    const featureRouter = require(path.join(process.cwd(), subpath));
    const featureName = subpath.replace(/^src[/\\]features[/\\]/, "").replace(/[\\/]router\.ts$/, "");

    router.use(`/${featureName}`, featureRouter.default);
  }

  return router;
};

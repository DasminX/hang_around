/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    env: {
      HA_APP_DATA_SOURCE: "IN_MEMORY",
      HA_APP_TESTING: "TRUE",
    },
    testTimeout: 30000,
    dir: "./src",
  },
});

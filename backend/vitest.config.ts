/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    env: {
      HA_APP_DATA_SOURCE: "IN_MEMORY",
    },
    testTimeout: 10000,
    dir: "./src",
  },
});

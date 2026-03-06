import { defineConfig } from "orval";

export default defineConfig({
  core: {
    input: "./api/v1.0/core/api.yaml",
    output: {
      target: "./api/v1.0/core/api.gen.zod.ts",
      client: "zod",
      mode: "single",
    },
  },
  coreTypes: {
    input: "./api/v1.0/core/api.yaml",
    output: {
      target: "./api/v1.0/core/api.gen.ts",
      client: "fetch",
      mode: "single",
    },
  },
  integration: {
    input: "./api/v1.0/swipegames-integration/api.yaml",
    output: {
      target: "./api/v1.0/swipegames-integration/api.gen.zod.ts",
      client: "zod",
      mode: "single",
    },
  },
  integrationTypes: {
    input: "./api/v1.0/swipegames-integration/api.yaml",
    output: {
      target: "./api/v1.0/swipegames-integration/api.gen.ts",
      client: "fetch",
      mode: "single",
    },
  },
});

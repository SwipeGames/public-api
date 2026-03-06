import { defineConfig } from "orval";

export default defineConfig({
  core: {
    input: "../../api/v1.0/core/api.yaml",
    output: {
      target: "./generated/core.zod.ts",
      client: "zod",
      mode: "single",
    },
  },
  coreTypes: {
    input: "../../api/v1.0/core/api.yaml",
    output: {
      target: "./generated/core.types.ts",
      client: "fetch",
      mode: "single",
    },
  },
  integration: {
    input: "../../api/v1.0/swipegames-integration/api.yaml",
    output: {
      target: "./generated/integration.zod.ts",
      client: "zod",
      mode: "single",
    },
  },
  integrationTypes: {
    input: "../../api/v1.0/swipegames-integration/api.yaml",
    output: {
      target: "./generated/integration.types.ts",
      client: "fetch",
      mode: "single",
    },
  },
});

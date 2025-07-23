// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  main: [
    "intro",
    "game-launch-url",

    {
      type: "category",
      label: "Core API",
      link: {
        type: "generated-index",
        title: "Core API",
        description: "Core API",
        slug: "/category/core",
      },
      items: require("./docs/v1.0/core/sidebar.ts"),
    },
    "changes-log",
  ],
};

export default sidebars;

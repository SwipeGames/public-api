// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  main: [
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: "doc",
        id: "getting-started",
      },
      items: ["terms", "game-session"],
    },

    "games",
    "currencies",
    "languages",
    "authn",

    {
      type: "category",
      label: "Free Rounds",
      link: {
        type: "doc",
        id: "free-rounds",
      },
      items: [],
    },
    {
      type: "category",
      label: "Core API",
      link: {
        type: "doc",
        id: "core",
      },
      items: [require("./docs/core/sidebar.ts")],
    },
    {
      type: "category",
      label: "Integration Adapter API",
      link: {
        type: "doc",
        id: "swipegames-integration",
      },
      items: [require("./docs/swipegames-integration/sidebar.ts")],
    },
    "changes-log",
  ],
};

export default sidebars;

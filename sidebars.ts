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
      items: ["free-rounds-bet-lines"],
    },
    {
      type: "category",
      label: "Core API",
      link: {
        type: "doc",
        id: "core",
      },
      items: ["game-launch-url", require("./docs/v1.0/core/sidebar.ts")],
    },
    {
      type: "category",
      label: "Integration Adapter API",
      link: {
        type: "doc",
        id: "swipegames-integration",
      },
      items: [require("./docs/v1.0/swipegames-integration/sidebar.ts")],
    },
    "changes-log",
  ],
};

export default sidebars;

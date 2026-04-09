// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  main: [
    "getting-started",
    "terms",
    "game-session",
    "games",
    "currencies",
    "locales",

    {
      type: "category",
      label: "Free Rounds",
      link: {
        type: "doc",
        id: "free-rounds",
      },
      items: ["free-rounds-bet-lines"],
    },
    "authn",
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
    "sdks",
    "changes-log",
  ],
};

export default sidebars;

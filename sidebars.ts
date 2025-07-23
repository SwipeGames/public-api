// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  main: [
    "intro",
    "terms",
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: "doc",
        id: "getting-started",
      },
      items: [],
    },

    "games",
    "game-session",
    "currencies",
    "languages",
    "authn",
    "game-launch-url",

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
        type: "generated-index",
        title: "Core API",
        description: "Core API",
        slug: "/core",
      },
      items: require("./docs/v1.0/core/sidebar.ts"),
    },
    "changes-log",
  ],
};

export default sidebars;

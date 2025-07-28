import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "v1.0/swipegames-integration/swipe-games-integration-adapter-public-api",
    },
    {
      type: "category",
      label: "Get Balance",
      items: [
        {
          type: "doc",
          id: "v1.0/swipegames-integration/get-balance",
          label: "Get balance",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

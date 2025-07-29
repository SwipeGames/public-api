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
    {
      type: "category",
      label: "Bet",
      items: [
        {
          type: "doc",
          id: "v1.0/swipegames-integration/bet",
          label: "Bet",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Win",
      items: [
        {
          type: "doc",
          id: "v1.0/swipegames-integration/win",
          label: "Win",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Refund",
      items: [
        {
          type: "doc",
          id: "v1.0/swipegames-integration/refund",
          label: "Refund",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

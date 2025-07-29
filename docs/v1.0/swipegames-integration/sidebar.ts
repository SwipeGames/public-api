import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Reverse Calls",
      items: [
        {
          type: "doc",
          id: "v1.0/swipegames-integration/get-balance",
          label: "Get balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/bet",
          label: "Bet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/win",
          label: "Win",
          className: "api-method post",
        },
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

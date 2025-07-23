import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "v1.0/core/swipe-games-public-core-api",
    },
    {
      type: "category",
      label: "Launch Game",
      items: [
        {
          type: "doc",
          id: "v1.0/core/create-new-game",
          label: "Create new game",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Free Rounds",
      items: [
        {
          type: "doc",
          id: "v1.0/core/create-new-free-rounds-campaign",
          label: "Create new free rounds campaign",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "v1.0/core/cancel-delete-free-rounds-campaign",
          label: "Cancel/Delete free rounds campaign",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

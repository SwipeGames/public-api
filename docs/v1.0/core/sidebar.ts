import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
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
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "v1.0/core/schemas/createnewgamerequest",
          label: "CreateNewGameRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/core/schemas/createnewgameresponse",
          label: "CreateNewGameResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/core/schemas/createfreeroundsrequest",
          label: "CreateFreeRoundsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/core/schemas/createfreeroundsresponse",
          label: "CreateFreeRoundsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/core/schemas/deletefreeroundsrequest",
          label: "DeleteFreeRoundsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/core/schemas/user",
          label: "User",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/core/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

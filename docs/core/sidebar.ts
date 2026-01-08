import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Launch Game",
      items: [
        {
          type: "doc",
          id: "core/create-new-game",
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
          id: "core/create-new-free-rounds-campaign",
          label: "Create new free rounds campaign",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "core/cancel-delete-free-rounds-campaign",
          label: "Cancel/Delete free rounds campaign",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Get Games",
      items: [
        {
          type: "doc",
          id: "core/get-games-information",
          label: "Get Games' Information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "core/schemas/platformtype",
          label: "PlatformType",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/createnewgamerequest",
          label: "CreateNewGameRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/createnewgameresponse",
          label: "CreateNewGameResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/createfreeroundsrequest",
          label: "CreateFreeRoundsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/createfreeroundsresponse",
          label: "CreateFreeRoundsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/deletefreeroundsrequest",
          label: "DeleteFreeRoundsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/gameinfoimages",
          label: "GameInfoImages",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/betlinevalue",
          label: "BetLineValue",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/betlineinfo",
          label: "BetLineInfo",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/gameinfo",
          label: "GameInfo",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/gamesresponse",
          label: "GamesResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/user",
          label: "User",
          className: "schema",
        },
        {
          type: "doc",
          id: "core/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

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
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/balanceresponse",
          label: "BalanceResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/betrequest",
          label: "BetRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/betresponse",
          label: "BetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/winrequest",
          label: "WinRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/winresponse",
          label: "WinResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/refundrequest",
          label: "RefundRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/refundresponse",
          label: "RefundResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "v1.0/swipegames-integration/schemas/errorresponsewithaction",
          label: "ErrorResponseWithAction",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

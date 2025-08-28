import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Reverse Calls",
      items: [
        {
          type: "doc",
          id: "swipegames-integration/get-balance",
          label: "Get balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "swipegames-integration/bet",
          label: "Bet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "swipegames-integration/win",
          label: "Win",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "swipegames-integration/refund",
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
          id: "swipegames-integration/schemas/errorresponsewithcodeandaction",
          label: "ErrorResponseWithCodeAndAction",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/balanceresponse",
          label: "BalanceResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/betrequest",
          label: "BetRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/betresponse",
          label: "BetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/winrequest",
          label: "WinRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/winresponse",
          label: "WinResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/refundrequest",
          label: "RefundRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/refundresponse",
          label: "RefundResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "swipegames-integration/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [{ type: "doc", id: "intro" }],
  openApiSidebar: [
    {
      type: "category",
      label: "Core",
      link: {
        type: "generated-index",
        title: "Core API",
        description: "Core API",
        slug: "/category/core",
      },
      items: require("./docs/v1.0/core/sidebar.ts"),
    },
  ],
};

export default sidebars;

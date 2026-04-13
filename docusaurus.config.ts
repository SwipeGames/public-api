// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const API_VERSION = "1.3.1";

const config: Config = {
  title: "Swipe Games",
  tagline: "Swipe Games Public API",
  url: "https://swipegames.github.io",
  baseUrl: "/public-api/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  markdown: {
    mermaid: true,
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "swipegames", // Usually your GitHub org/user name.
  projectName: "public-api", // Usually your repo name.

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.ts"),
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          lastVersion: "current",
          versions: {
            current: { label: API_VERSION, path: "/" },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  onBrokenMarkdownLinks: "warn",

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "Swipe Games Public API",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://github.com/swipegames/public-api",
          label: "GitHub",
          position: "right",
        },
        {
          type: "docsVersionDropdown",
          versions: {
            current: { label: API_VERSION },
          },
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Swipe Games.`,
    },
    prism: {
      additionalLanguages: ["ruby", "csharp", "php", "java", "powershell", "json", "bash", "dart", "objectivec", "r"],
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "javascript",
        language: "javascript",
        logoClass: "javascript",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
      {
        highlight: "java",
        language: "java",
        logoClass: "java",
        variant: "unirest",
      },
      {
        highlight: "csharp",
        language: "csharp",
        logoClass: "csharp",
      },
      {
        highlight: "php",
        language: "php",
        logoClass: "php",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "ruby",
        language: "ruby",
        logoClass: "ruby",
      },
      {
        highlight: "powershell",
        language: "powershell",
        logoClass: "powershell",
      },
    ],
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          corev10: {
            specPath: "api/v1.0/core/api.yaml",
            outputDir: "docs/core", //latest version
            downloadUrl: "https://raw.githubusercontent.com/swipegames/public-api/main/api/v1.0/core/api.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "info",
            },
            showSchemas: true,
          } satisfies OpenApiPlugin.Options,
          swipegamesintegrationv10: {
            specPath: "api/v1.0/swipegames-integration/api.yaml",
            outputDir: "docs/swipegames-integration", // latest version
            downloadUrl:
              "https://raw.githubusercontent.com/swipegames/public-api/main/api/v1.0/swipegames-integration/api.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "info",
            },
            showSchemas: true,
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"],
};

export default async function createConfig() {
  return config;
}

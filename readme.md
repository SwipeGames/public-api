# Swipe Games Public API

API documentation site, OpenAPI specs, and generated client packages for Swipe Games Public API.

- **Docs**: Built with [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)
- **API specs**: OpenAPI 3.0 YAML in `api/v1.0/`
- **Packages**: Go, TypeScript, and PHP types generated from the specs

## Requirements

- Node.js + Yarn
- Go
- Java 17 (`brew install --cask temurin@17`)

## Quick Start

```bash
# Install dependencies
yarn install

# Start docs locally
make up
```

## Generated Packages

Types are generated from the OpenAPI specs and published as packages:

| Package | Registry | Install |
|---------|----------|---------|
| `@swipegames/public-api` | [npm](https://www.npmjs.com/package/@swipegames/public-api) | `npm install @swipegames/public-api` |
| `swipegames/public-api` | [Packagist](https://packagist.org/packages/swipegames/public-api) | `composer require swipegames/public-api` |
| Go (services) | GitHub | `go get github.com/swipegames/public-api` |
| Go (types only) | GitHub | `go get github.com/swipegames/public-api/api/v1.0/core/types` |

## Commands

| Command | Description |
|---------|-------------|
| `make up` | Start docs site locally |
| `make gen-api` | Regenerate all code (Go + TypeScript + PHP) |
| `make gen-docs` | Regenerate API documentation |
| `make bump-version v=x.y.z` | Bump version everywhere and regenerate |
| `make build-node` | Build the Node/TypeScript package |

## Versioning

We use [semver](https://semver.org/). See `CLAUDE.md` for the full versioning workflow.

To bump the version:

```bash
make bump-version v=1.2.17
```

This updates all version locations (API specs, docusaurus config) and regenerates all code and docs.

## CI/CD

- **PR workflow**: Validates version bump, checks generated code is up-to-date, builds packages and docs
- **Deploy workflow** (on release): Publishes npm + Packagist packages, deploys docs to GitHub Pages

## Customizations

This documentation includes custom components (swizzled from `docusaurus-theme-openapi-docs`) to enforce canonical JSON format in all code examples and request panels.

### Swizzled Components

When upgrading `docusaurus-theme-openapi-docs`, these components may need to be reviewed and updated:

#### 1. `src/theme/ApiExplorer/CodeSnippets/index.tsx`

**Purpose:** Post-processes code snippets to ensure canonical JSON format

**Modifications:**

- Added `postProcessSnippet()` function that processes code snippets for each language:
    - **Python:** Adds `sort_keys=True` parameter to `json.dumps()` (for explicitness)
    - **cURL, C#, Go, PHP, Java, PowerShell, C, Objective-C, OCaml, R, Swift, Kotlin, Rust:** Compacts JSON (removes whitespace/newlines)
    - **Ruby:** Adds `{ sort_keys: true }` option to `JSON.dump()` (for explicitness)
    - **Node.js, JavaScript, Dart:** No changes needed
- Modified all `codegen.convert()` callbacks to call `postProcessSnippet()` before `setCodeText()`
- **Note:** Keys are already sorted by `ApiExplorerWrapper`, so we only compact (not re-sort)

**Dependencies:**

- `code-snippets-types.ts` - Copied from original theme
- `languages.ts` - Copied from original theme

#### 2. `src/theme/ApiExplorer/Body/index.tsx`

**Purpose:** Displays compact canonical JSON in the interactive request panel

**Modifications:**

- Changed all `JSON.stringify(obj, null, 2)` calls to `JSON.stringify(obj)` to display compact canonical JSON instead of pretty-printed JSON
- Applies to: `jsonRequestBodyExample`, `example`, and `examples` bodies
- **Note:** Keys are already sorted by `ApiExplorerWrapper`, so we only remove whitespace

#### 3. `src/theme/ApiExplorer/index.js` (Wrapper)

**Purpose:** Pre-sorts JSON keys before code generation

**Modifications:**

- Added `sortKeysCanonical()` function to recursively sort object keys
- Wraps `ApiExplorer` component and sorts `props.item.jsonRequestBodyExample` before passing to original component

### Why Canonical JSON?

The Swipe Games API requires canonical JSON format for signature generation:

- Keys must be **alphabetically sorted**
- No whitespace between elements
- Consistent formatting for HMAC-SHA256 signatures

See `/docs/authn.md` for detailed authentication documentation.

### Maintenance Notes

When updating `docusaurus-theme-openapi-docs`:

1. Check if swizzled components have breaking changes
2. Review modifications in the components listed above
3. Test code snippet generation for all languages
4. Verify request panel displays compact JSON
5. Run `yarn build` to ensure no compilation errors

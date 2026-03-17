# CLAUDE.md

## Project Overview

Swipe Games Public API — documentation site, OpenAPI specs, and generated client packages.

- **Docs site**: Built with [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)
- **API specs**: OpenAPI 3.0 YAML files in `api/v1.0/`
- **Generated packages**: Go, TypeScript/Node, and PHP types generated from the specs

## Repository Structure

```
go.mod                           # Root Go module (server/client, Echo, go 1.23)
go.work                         # Go workspace for local development
api/v1.0/
  common-components.gen.go       # Generated common types+spec (root module)
  common/
    common.yaml                  # Shared schemas (ErrorResponse, User)
    common.gen.go                # Generated common types only (own module, go 1.22.5)
    go.mod
  core/
    api.yaml                     # Core Public API spec
    api.gen.go                   # Generated Go server/client/types/spec (root module)
    api.gen.ts                   # Generated TypeScript types
    api.gen.zod.ts               # Generated Zod schemas
    types/
      types.gen.go               # Generated Go types only (own module, go 1.22.5)
      go.mod
  swipegames-integration/
    api.yaml                     # Integration Adapter API spec
    api.gen.go / .ts / .zod.ts   # Generated code (root module)
    types/
      types.gen.go               # Generated Go types only (own module, go 1.22.5)
      go.mod
packages/
  node/                          # npm package: @swipegames/public-api
  php/                           # Composer package: swipegames/public-api
composer.json                    # Root composer.json for Packagist
openapi-generator-php.yaml      # PHP generator config
orval.config.ts                  # TypeScript generator config (Orval)
openapitools.json                # openapi-generator-cli version pinning
```

### Go Module Structure

The Go code is split into multiple modules to allow lightweight SDK imports:

- **Root module** (`github.com/swipegames/public-api`): Server + client + types + spec. Requires Echo, go 1.23. Used by services.
- **Common types** (`github.com/swipegames/public-api/api/v1.0/common`): Shared types only (ErrorResponse, User). No Echo, go 1.22.5.
- **Core types** (`github.com/swipegames/public-api/api/v1.0/core/types`): Core API types only. Depends on common. No Echo, go 1.22.5.
- **Integration types** (`github.com/swipegames/public-api/api/v1.0/swipegames-integration/types`): Integration types only. Depends on common. No Echo, go 1.22.5.

SDK consumers import the lightweight types modules; services import the root module for server/client code.

## Versioning

We use [semver](https://semver.org/) for both API and docs:

- **Major** — breaking changes
- **Minor** — new features without breaking changes
- **Patch** — bug fixes or minor non-API changes

### Version Locations (must stay in sync)

- `api/v1.0/common/common.yaml` — `version` field
- `api/v1.0/core/api.yaml` — `version` field
- `api/v1.0/swipegames-integration/api.yaml` — `version` field
- `docusaurus.config.ts` — `API_VERSION` constant
- `docs/changes-log.md` — changelog

Use `make bump-version v=x.y.z` to update all version locations and regenerate everything.

### Major Version Changes

Major versions require creating a new folder under `api/` with the new version name and copying the API files into it.

## How to Add Changes

When updating the API:

1. Make sure the change doesn't break backward compatibility
2. Update the appropriate API file in `api/v*.*/**/*.yaml`
3. Run `make bump-version v=x.y.z` (bumps all versions, regenerates code and docs)
4. Update related docs if needed
5. Add entry to `docs/changes-log.md`
6. Test locally: `make up`

## Code Generation

All generated code is committed to git. The CI checks that generated code matches the specs.

| Language   | Generator                  | Source specs                    | Output                          |
|------------|----------------------------|---------------------------------|---------------------------------|
| Go (full)  | oapi-codegen v2            | All YAML specs                  | `api/v1.0/**/*.gen.go` (root module) |
| Go (types) | oapi-codegen v2            | All YAML specs                  | `api/v1.0/**/types/*.gen.go` (sub-modules) |
| TypeScript | Orval                      | core + integration YAML         | `api/v1.0/**/*.gen.ts`          |
| PHP        | openapi-generator-cli 7.x  | All YAML specs                  | `packages/php/src/`             |

### PHP Generation Notes

- Requires Java 17 (`brew install --cask temurin@17`)
- Shared schemas (ErrorResponse, User) live in `Common/` namespace; duplicates are removed post-generation
- Namespace references are fixed automatically (Core/Integration → Common)
- Generator scaffolding (.travis.yml, git_push.sh, etc.) is cleaned up automatically

## Commands

- `make gen-api` — regenerate all code (Go + TypeScript + PHP)
- `make gen-api-v10` — regenerate Go + TypeScript only
- `make gen-api-php` — regenerate PHP only
- `make gen-docs` — regenerate API documentation
- `make bump-version v=x.y.z` — bump version everywhere and regenerate
- `make build-node` — build the Node/TypeScript package
- `make up` — start docs site locally

## Requirements

- Node.js + Yarn
- Go (for oapi-codegen)
- Java 17 (for openapi-generator-cli, PHP generation)

## CI/CD

### PR Workflow (`.github/workflows/pr.yml`)

- Validates version is bumped
- Regenerates all code and checks it matches (no stale generated code)
- Builds the Node package
- Builds the docs site

### Deploy Workflow (`.github/workflows/deploy.yml`)

Triggered by GitHub release or manual dispatch:

1. Publishes `@swipegames/public-api` to npm (idempotent — skips if version exists)
2. Notifies Packagist to update `swipegames/public-api`
3. Builds and deploys docs to GitHub Pages

### Published Packages

- **npm**: `@swipegames/public-api` (TypeScript types + Zod schemas)
- **Packagist**: `swipegames/public-api` (PHP types, uses git tags as versions)
- **Go (services)**: `github.com/swipegames/public-api/api/v1.0/core` (server+client+types, requires Echo)
- **Go (SDK/types only)**: `github.com/swipegames/public-api/api/v1.0/core/types` (no Echo)

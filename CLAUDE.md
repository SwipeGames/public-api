# CLAUDE.md

## Project Overview

Swipe Games Public API documentation site built with [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs).

## Versioning

We use [semver](https://semver.org/) for both API and docs:

- **Major** — breaking changes
- **Minor** — new features without breaking changes
- **Patch** — bug fixes or minor non-API changes

## How to Add Changes

When updating the API:

1. Make sure the change doesn't break backward compatibility
2. Update the appropriate API file in `api/v1.0/<service>/<service>-api.yaml`
3. Bump the version in the API file header
4. Update `API_VERSION` in `docusaurus.config.ts`
5. Regenerate the API: `make gen-api`
6. Regenerate the docs: `make gen-docs`
7. Update related docs if needed
8. Add entry to `docs/changes-log.md`
9. Test locally: `make up`

### Version Locations

- API spec: `version` field in `api/v1.0/core/api.yaml` header
- Docs: `API_VERSION` constant in `docusaurus.config.ts`
- Changes log: `docs/changes-log.md`

### Major Version Changes

Major versions require creating a new folder under `api/` with the new version name and copying the API files into it.

## Commands

- `make gen-docs` — regenerate API documentation
- `make up` — start locally

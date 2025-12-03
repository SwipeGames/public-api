# Swipe Games Public API

Based on [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)

## Requirements

-   node
-   yarn

## Versioning

When we add/change something we bump the version of the API and docs.
We use semver versioning for both API and docs:

-   Major version is incremented when there are breaking changes.
-   Minor version is incremented when new features are added without breaking changes.
-   Patch version is incremented for bug fixes or minor changes that do not affect the API

### How to add a new version into the API

Minor and Patch versions are added directly into the API file header.
Major versions require creating a new folder under `api/` with the new version name and copying the API files into it.

### How to add a new version into the docs

Update current version in `docusaurus.config.ts` to the new version.
Regenerate the docs using `make gen-docs`.

## Documentation

## How to

### Add new API

### Add fix to the API

Make sure fix doesn't break backward compatibility.

-   add the fix to the appropriate versioned API file in `api/v1.0/<service>/<service>-api.yaml`
-   change API version in the file header
-   update related docs if needed
-   generate the API documentation using `make gen-docs`
-   test the API using `make up`

### Generate docs

Run the following command to generate the API documentation:

```bash
make gen-docs
```

### Start locally

Run the following command to generate the API documentation:

```bash
make up
```

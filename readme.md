# Swipe Games Public API

Based on [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)

## Requirements

- node
- yarn

## Versioning

We use [semver](https://semver.org/) versioning for both API and docs. See `CLAUDE.md` for the full versioning workflow.

## Documentation

### Generate docs

```bash
make gen-docs
```

### Start locally

```bash
make up
```

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

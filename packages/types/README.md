# @swipegames/public-api

TypeScript types and Zod schemas for the Swipe Games Public API.

## Installation

```bash
npm install @swipegames/public-api
```

> **Note:** This package is published to GitHub Packages. You need to configure your `.npmrc` to use the GitHub registry for the `@swipegames` scope:
>
> ```
> @swipegames:registry=https://npm.pkg.github.com
> ```

## Usage

```typescript
import { CoreTypes, CoreSchemas, IntegrationTypes, IntegrationSchemas } from "@swipegames/public-api";

// Use TypeScript types
const request: CoreTypes.CreateNewGameRequest = {
  cID: "...",
  extCID: "...",
  gameID: "...",
  currency: "USD",
  locale: "en",
  platform: "desktop",
  demo: false,
};

// Validate with Zod schemas
const parsed = CoreSchemas.PostCreateNewGameBody.parse(request);
```

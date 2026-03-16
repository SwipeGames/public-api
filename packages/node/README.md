# @swipegames/public-api

TypeScript types and Zod schemas for the Swipe Games Public API.

This package is meant to be used as part of the [Swipe Games Integration SDK](https://www.npmjs.com/package/@swipegames/integration-sdk).

For more information check the full [Swipe Games Public API Documentation](https://swipegames.github.io/public-api/).

## Installation

```bash
npm install @swipegames/public-api
```

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

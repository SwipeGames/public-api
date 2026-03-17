---
id: sdks
title: Integration SDKs
slug: /sdks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Integration SDKs

Official SDKs for integrating with the Swipe Games platform. Each SDK provides a Core API client, typed Integration Adapter request/response interfaces, signature verification, and response builder helpers.

## Available SDKs

<Tabs groupId="sdk-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @swipegames/integration-sdk
```

- Requirements: Node.js >= 18, ESM only
- [Documentation](https://www.npmjs.com/package/@swipegames/integration-sdk)

</TabItem>
<TabItem value="go" label="Go">

```bash
go get github.com/swipegames/integration-sdk-go
```

- Requirements: Go 1.13+
- [Documentation](https://github.com/swipegames/integration-sdk-go)

</TabItem>
<TabItem value="php" label="PHP">

```bash
composer require swipegames/integration-sdk
```

- Requirements: PHP 8.1+, Guzzle 7.x
- [Documentation](https://packagist.org/packages/swipegames/integration-sdk)

</TabItem>
</Tabs>

---

## AI-Assisted Integration

Copy the prompt for your language below and paste it into your AI coding assistant (Claude, Cursor, GitHub Copilot, etc.) to integrate the Swipe Games SDK into your project.

You can append any extra context at the end of the prompt, such as links to internal documentation, specific requirements, or details about your project setup.

<Tabs groupId="sdk-language">
<TabItem value="node" label="Node.js" default>

````text
You are helping me integrate the Swipe Games platform into this codebase using
their Node.js SDK.

## Goal

Set up the Swipe Games integration using the official SDK, connecting whichever
parts of the API are relevant to this project's purpose.

## Success Criteria

1. Install and configure the SDK with proper environment variable management.
2. Implement all integration points relevant to this codebase (see Analysis step).
3. All reverse-call endpoints must verify request signatures using the SDK.
4. All credentials must come from environment variables, never hardcoded.
5. Explain what you changed and why.

**You are NOT done until the integration compiles, credentials are externalized,
and all relevant endpoints are wired up.**

## SDK Details

- Package: @swipegames/integration-sdk
- Install: npm install @swipegames/integration-sdk
- ESM only — uses "type": "module", cannot be require()'d from CommonJS
- SDK README (read this first): https://github.com/swipegames/integration-sdk-node/blob/main/README.md
- Full API documentation: https://swipegames.github.io/public-api/

## What the SDK Provides

The SDK covers both sides of the integration. See the README for the full method
list and usage examples.

1. **Core API client** — outbound calls we make to Swipe Games: launch games,
   list available games, manage free rounds campaigns.

2. **Integration Adapter helpers** — inbound reverse calls from Swipe Games to
   us. We must implement 4 HTTP endpoints (GET /balance, POST /bet, POST /win,
   POST /refund). The SDK provides parseAndVerify* methods for signature
   verification + parsing, and typed response builders for each endpoint.

## Client Setup

```typescript
import { SwipeGamesClient } from "@swipegames/integration-sdk";

const client = new SwipeGamesClient({
  cid: process.env.SWIPEGAMES_CID!,
  extCid: process.env.SWIPEGAMES_EXT_CID!,
  apiKey: process.env.SWIPEGAMES_API_KEY!,
  integrationApiKey: process.env.SWIPEGAMES_INTEGRATION_API_KEY!,
  env: process.env.SWIPEGAMES_ENV as "staging" | "production" ?? "staging",
});
```

## Important Constraints

- All monetary amounts are strings in the smallest currency unit (e.g., "1000"
  = €10.00). Never divide or format — pass them as-is.
- The `sessionID` in reverse calls is the one we provided when calling
  `createNewGame()` — use it to identify the player/session in our system.
- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- During free rounds, bet/win requests arrive with `type: "free"` and an `frID`.
  See https://swipegames.github.io/public-api/free-rounds for handling details.
- Bet transactions must be idempotent — use `txID` as the idempotency key.
- Refund requests reference `origTxID` — the original bet transaction to reverse.
- The SDK handles request signing for outbound Core API calls automatically.

## Common Mistakes — Do NOT

- Do NOT implement your own signature verification — always use the SDK's
  parseAndVerify* methods.
- Do NOT treat amounts as floats or divide them — they are already in the
  smallest currency unit as strings.
- Do NOT generate your own txID — use the one provided by the platform in each
  reverse call as the idempotency key.
- Do NOT hardcode credentials — always use environment variables.

---

## What I Want From You

### Step 1 — Analysis

Inspect this codebase and determine:
1. What kind of project this is (backend service, user-facing app, back-office
   tool, or a combination).
2. What framework/router is in use (Express, Fastify, Hono, Next.js, etc.).
3. Where HTTP handlers or API routes are defined.
4. Where environment variables are managed (.env files, config modules, etc.).
5. Whether there's an existing wallet/balance/ledger system to connect to.

Based on this analysis, determine which parts of the integration apply:
- **Backend service** → Integration Adapter endpoints (balance, bet, win, refund)
- **User-facing app** → Core API client (list games, create game sessions, redirect players)
- **Back-office tool** → Core API client (free rounds management, game listing)
- **Multiple** → implement all relevant parts

If the purpose is unclear, ask me before proceeding.

### Step 2 — Implementation

1. Install the SDK package.
2. Create a client configuration module with environment variables.
3. Implement the relevant integration points identified in Step 1.
4. For Integration Adapter endpoints:
   - Wire up all 4 reverse-call handlers using our framework's routing.
   - Use parseAndVerify* for every inbound request.
   - Return properly typed responses using the response builders.
   - Handle the `insufficient_funds` error case for bet requests.
   - Handle free rounds (type: "free") if applicable.
5. For Core API usage:
   - Wrap SDK calls in our application's service/controller layer.
   - Handle errors as documented in the SDK README.
6. If this codebase already has a testing suite, add test coverage for the new
   integration code. Do not set up a testing framework from scratch.
7. If this codebase has existing documentation (README, API docs, developer
   guides), update it to reflect the new integration.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration compiles and the endpoints are reachable.
4. If tests were added, verify they pass.
5. If there are any ambiguities or decisions I need to make, list them.

````

</TabItem>
<TabItem value="go" label="Go">

````text
You are helping me integrate the Swipe Games platform into this codebase using
their Go SDK.

## Goal

Set up the Swipe Games integration using the official SDK, connecting whichever
parts of the API are relevant to this project's purpose.

## Success Criteria

1. Install and configure the SDK with proper environment variable management.
2. Implement all integration points relevant to this codebase (see Analysis step).
3. All reverse-call endpoints must verify request signatures using the SDK.
4. All credentials must come from environment variables, never hardcoded.
5. Explain what you changed and why.

**You are NOT done until the integration compiles, credentials are externalized,
and all relevant endpoints are wired up.**

## SDK Details

- Module: github.com/swipegames/integration-sdk-go
- Install: go get github.com/swipegames/integration-sdk-go
- Import as: swipegames "github.com/swipegames/integration-sdk-go"
- SDK README (read this first): https://github.com/swipegames/integration-sdk-go/blob/main/README.md
- Full API documentation: https://swipegames.github.io/public-api/

## What the SDK Provides

The SDK covers both sides of the integration. See the README for the full method
list and usage examples.

1. **Core API client** — outbound calls we make to Swipe Games: launch games,
   list available games, manage free rounds campaigns.

2. **Integration Adapter helpers** — inbound reverse calls from Swipe Games to
   us. We must implement 4 HTTP endpoints (GET /balance, POST /bet, POST /win,
   POST /refund). The SDK provides ParseAndVerify* methods for signature
   verification + parsing, and typed response builders for each endpoint.

## Client Setup

```go
import swipegames "github.com/swipegames/integration-sdk-go"

client, err := swipegames.NewClient(swipegames.ClientConfig{
    CID:               os.Getenv("SWIPEGAMES_CID"),
    ExtCID:            os.Getenv("SWIPEGAMES_EXT_CID"),
    APIKey:            os.Getenv("SWIPEGAMES_API_KEY"),
    IntegrationAPIKey: os.Getenv("SWIPEGAMES_INTEGRATION_API_KEY"),
    Env:               swipegames.EnvStaging, // EnvStaging | EnvProduction
})
```

## Important Constraints

- All monetary amounts are strings in the smallest currency unit (e.g., "1000"
  = €10.00). Never divide or format — pass them as-is.
- The `SessionID` in reverse calls is the one we provided when calling
  `CreateNewGame()` — use it to identify the player/session in our system.
- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- During free rounds, bet/win requests arrive with `type: "free"` and an `frID`.
  See https://swipegames.github.io/public-api/free-rounds for handling details.
- Bet transactions must be idempotent — use `TxID` as the idempotency key.
- Refund requests reference `OrigTxID` — the original bet transaction to reverse.
- The SDK handles request signing for outbound Core API calls automatically.

## Common Mistakes — Do NOT

- Do NOT implement your own signature verification — always use the SDK's
  ParseAndVerify* methods.
- Do NOT treat amounts as floats or divide them — they are already in the
  smallest currency unit as strings.
- Do NOT generate your own TxID — use the one provided by the platform in each
  reverse call as the idempotency key.
- Do NOT hardcode credentials — always use environment variables.

---

## What I Want From You

### Step 1 — Analysis

Inspect this codebase and determine:
1. What kind of project this is (backend service, user-facing app, back-office
   tool, or a combination).
2. What HTTP router/framework is in use (net/http, chi, gin, echo, fiber, etc.).
3. Where HTTP handlers or routes are registered.
4. Where configuration/environment variables are managed.
5. Whether there's an existing wallet/balance/ledger system to connect to.

Based on this analysis, determine which parts of the integration apply:
- **Backend service** → Integration Adapter endpoints (balance, bet, win, refund)
- **User-facing app** → Core API client (list games, create game sessions, redirect players)
- **Back-office tool** → Core API client (free rounds management, game listing)
- **Multiple** → implement all relevant parts

If the purpose is unclear, ask me before proceeding.

### Step 2 — Implementation

1. Add the SDK module dependency.
2. Create a client initialization function with environment variables.
3. Implement the relevant integration points identified in Step 1.
4. For Integration Adapter endpoints:
   - Wire up all 4 reverse-call handlers using our framework's routing.
   - Use ParseAndVerify* for every inbound request.
   - Return properly typed responses using the response builders.
   - Handle the `insufficient_funds` error case for bet requests.
   - Handle free rounds (type: "free") if applicable.
5. For Core API usage:
   - Wrap SDK calls in our application's service/handler layer.
   - Handle errors as documented in the SDK README.
6. If this codebase already has a testing suite, add test coverage for the new
   integration code. Do not set up a testing framework from scratch.
7. If this codebase has existing documentation (README, API docs, developer
   guides), update it to reflect the new integration.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration compiles (`go build ./...`).
4. If tests were added, verify they pass.
5. If there are any ambiguities or decisions I need to make, list them.

````

</TabItem>
<TabItem value="php" label="PHP">

````text
You are helping me integrate the Swipe Games platform into this codebase using
their PHP SDK.

## Goal

Set up the Swipe Games integration using the official SDK, connecting whichever
parts of the API are relevant to this project's purpose.

## Success Criteria

1. Install and configure the SDK with proper environment variable management.
2. Implement all integration points relevant to this codebase (see Analysis step).
3. All reverse-call endpoints must verify request signatures using the SDK.
4. All credentials must come from environment variables, never hardcoded.
5. Explain what you changed and why.

**You are NOT done until the integration compiles, credentials are externalized,
and all relevant endpoints are wired up.**

## SDK Details

- Package: swipegames/integration-sdk
- Install: composer require swipegames/integration-sdk
- Main namespace: SwipeGames\SDK
- SDK README (read this first): https://github.com/swipegames/integration-sdk-php/blob/main/README.md
- Full API documentation: https://swipegames.github.io/public-api/

## What the SDK Provides

The SDK covers both sides of the integration. See the README for the full method
list and usage examples.

1. **Core API client** — outbound calls we make to Swipe Games: launch games,
   list available games, manage free rounds campaigns.

2. **Integration Adapter helpers** — inbound reverse calls from Swipe Games to
   us. We must implement 4 HTTP endpoints (GET /balance, POST /bet, POST /win,
   POST /refund). The SDK provides parseAndVerify* methods for signature
   verification + parsing, and ResponseBuilder for typed responses.

3. **Type namespaces** (generated from OpenAPI specs):
   - `SwipeGames\PublicApi\Common` — ErrorResponse, User
   - `SwipeGames\PublicApi\Core` — Core API request/response types
   - `SwipeGames\PublicApi\Integration` — Integration Adapter types

## Client Setup

```php
use SwipeGames\SDK\SwipeGamesClient;
use SwipeGames\SDK\Client\ClientConfig;

$client = new SwipeGamesClient(new ClientConfig(
    cid: env('SWIPEGAMES_CID'),
    extCid: env('SWIPEGAMES_EXT_CID'),
    apiKey: env('SWIPEGAMES_API_KEY'),
    integrationApiKey: env('SWIPEGAMES_INTEGRATION_API_KEY'),
    env: env('SWIPEGAMES_ENV', 'staging'), // 'staging' or 'production'
));
```

## Important Constraints

- All monetary amounts are strings in the smallest currency unit (e.g., "1000"
  = €10.00). Never divide or format — pass them as-is.
- The `sessionID` in reverse calls is the one we provided when calling
  `createNewGame()` — use it to identify the player/session in our system.
- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- During free rounds, bet/win requests arrive with `type: "free"` and an `frID`.
  See https://swipegames.github.io/public-api/free-rounds for handling details.
- Bet transactions must be idempotent — use `txID` as the idempotency key.
- Refund requests reference `origTxID` — the original bet transaction to reverse.
- The SDK handles request signing for outbound Core API calls automatically.

## Common Mistakes — Do NOT

- Do NOT implement your own signature verification — always use the SDK's
  parseAndVerify* methods.
- Do NOT treat amounts as floats or divide them — they are already in the
  smallest currency unit as strings.
- Do NOT generate your own txID — use the one provided by the platform in each
  reverse call as the idempotency key.
- Do NOT hardcode credentials — always use environment variables.

---

## What I Want From You

### Step 1 — Analysis

Inspect this codebase and determine:
1. What kind of project this is (backend service, user-facing app, back-office
   tool, or a combination).
2. What framework is in use (Laravel, Symfony, Slim, vanilla PHP, etc.).
3. Where HTTP routes/controllers are defined.
4. Where environment variables are managed (.env, config files, etc.).
5. Whether there's an existing wallet/balance/ledger system to connect to.

Based on this analysis, determine which parts of the integration apply:
- **Backend service** → Integration Adapter endpoints (balance, bet, win, refund)
- **User-facing app** → Core API client (list games, create game sessions, redirect players)
- **Back-office tool** → Core API client (free rounds management, game listing)
- **Multiple** → implement all relevant parts

If the purpose is unclear, ask me before proceeding.

### Step 2 — Implementation

1. Install the SDK via Composer.
2. Create a client configuration (service provider, factory, or config file
   depending on framework).
3. Implement the relevant integration points identified in Step 1.
4. For Integration Adapter endpoints:
   - Wire up all 4 reverse-call handlers using our framework's routing.
   - Use parseAndVerify* for every inbound request.
   - Return properly typed responses using ResponseBuilder.
   - Handle the `insufficient_funds` error case for bet requests.
   - Handle free rounds (type: "free") if applicable.
5. For Core API usage:
   - Wrap SDK calls in our application's service/controller layer.
   - Handle errors as documented in the SDK README.
6. If this codebase already has a testing suite, add test coverage for the new
   integration code. Do not set up a testing framework from scratch.
7. If this codebase has existing documentation (README, API docs, developer
   guides), update it to reflect the new integration.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration works (no syntax errors, routes registered).
4. If tests were added, verify they pass.
5. If there are any ambiguities or decisions I need to make, list them.

````

</TabItem>
</Tabs>

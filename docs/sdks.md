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

- Requirements: Go 1.22+
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

1. **Core API client** (outbound calls we make to Swipe Games):
   - `createNewGame()` — launch a game, returns a game URL to redirect the player
   - `getGames()` — list available games with metadata
   - `createFreeRounds()` / `cancelFreeRounds()` — manage promotional free rounds

2. **Integration Adapter helpers** (inbound reverse calls from Swipe Games to us):
   We must implement 4 HTTP endpoints that the platform calls during gameplay:
   - GET /balance — return the player's current balance
   - POST /bet — deduct a bet amount from the player's wallet
   - POST /win — credit a win amount to the player's wallet
   - POST /refund — refund a previously placed bet
   The SDK provides:
   - `parseAndVerifyBalanceRequest()` / `parseAndVerifyBetRequest()` /
     `parseAndVerifyWinRequest()` / `parseAndVerifyRefundRequest()`
     — verify signature + parse + validate with Zod in one step
   - `createBalanceResponse()` / `createBetResponse()` / `createWinResponse()` /
     `createRefundResponse()` / `createErrorResponse()` — typed response builders

3. **Error types**: `SwipeGamesApiError` (non-2xx from API),
   `SwipeGamesValidationError` (client-side Zod validation failure)

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

- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- During free rounds, bet/win requests arrive with `type: "free"` and an `frID`.
  See https://swipegames.github.io/public-api/free-rounds for handling details.
- Bet transactions must be idempotent — use `txID` as the idempotency key.
- Refund requests reference `origTxID` — the original bet transaction to reverse.
- The SDK handles request signing for outbound Core API calls automatically.
- All reverse-call signatures MUST be verified using the SDK's parseAndVerify*
  methods — never skip signature verification.

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
   - Handle both `SwipeGamesApiError` and `SwipeGamesValidationError`.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration compiles and the endpoints are reachable.
4. If there are any ambiguities or decisions I need to make, list them.

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

1. **Core API client** (outbound calls we make to Swipe Games):
   - `CreateNewGame()` — launch a game, returns a game URL to redirect the player
   - `GetGames()` — list available games with metadata
   - `CreateFreeRounds()` / `CancelFreeRounds()` — manage promotional free rounds

2. **Integration Adapter helpers** (inbound reverse calls from Swipe Games to us):
   We must implement 4 HTTP endpoints that the platform calls during gameplay:
   - GET /balance — return the player's current balance
   - POST /bet — deduct a bet amount from the player's wallet
   - POST /win — credit a win amount to the player's wallet
   - POST /refund — refund a previously placed bet
   The SDK provides:
   - `ParseAndVerifyBalanceRequest()` / `ParseAndVerifyBetRequest()` /
     `ParseAndVerifyWinRequest()` / `ParseAndVerifyRefundRequest()`
     — verify signature + parse + validate in one step
   - `NewBalanceResponse()` / `NewBetResponse()` / `NewWinResponse()` /
     `NewRefundResponse()` / `NewErrorResponse()` — typed response builders

3. **Error types**: `*APIError` (non-2xx from API),
   `*ValidationError` (client-side validation failure)

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

- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- During free rounds, bet/win requests arrive with `type: "free"` and an `frID`.
  See https://swipegames.github.io/public-api/free-rounds for handling details.
- Bet transactions must be idempotent — use `txID` as the idempotency key.
- Refund requests reference `origTxID` — the original bet transaction to reverse.
- The SDK handles request signing for outbound Core API calls automatically.
- All reverse-call signatures MUST be verified using the SDK's ParseAndVerify*
  methods — never skip signature verification.

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
   - Handle the `insufficient_funds` error case for bet requests
     (use `NewErrorResponse` with `ErrorCodeInsufficientFunds`).
   - Handle free rounds (type: "free") if applicable.
5. For Core API usage:
   - Wrap SDK calls in our application's service/handler layer.
   - Handle both `*APIError` and `*ValidationError` with `errors.As()`.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration compiles (`go build ./...`).
4. If there are any ambiguities or decisions I need to make, list them.

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

1. **Core API client** (outbound calls we make to Swipe Games):
   - `createNewGame()` — launch a game, returns a game URL to redirect the player
   - `getGames()` — list available games with metadata
   - `createFreeRounds()` / `cancelFreeRounds()` — manage promotional free rounds

2. **Integration Adapter helpers** (inbound reverse calls from Swipe Games to us):
   We must implement 4 HTTP endpoints that the platform calls during gameplay:
   - GET /balance — return the player's current balance
   - POST /bet — deduct a bet amount from the player's wallet
   - POST /win — credit a win amount to the player's wallet
   - POST /refund — refund a previously placed bet
   The SDK provides:
   - `parseAndVerifyBalanceRequest()` / `parseAndVerifyBetRequest()` /
     `parseAndVerifyWinRequest()` / `parseAndVerifyRefundRequest()`
     — verify signature + parse + validate in one step
   - `ResponseBuilder::balanceResponse()` / `::betResponse()` /
     `::winResponse()` / `::refundResponse()` / `::errorResponse()`
     — JsonSerializable response builders

3. **Error types**: `SwipeGamesApiException` (non-2xx from API),
   `SwipeGamesValidationException` (client-side validation failure)

4. **Type namespaces** (generated from OpenAPI specs):
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

- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- During free rounds, bet/win requests arrive with `type: "free"` and an `frID`.
  See https://swipegames.github.io/public-api/free-rounds for handling details.
- Bet transactions must be idempotent — use `txID` as the idempotency key.
- Refund requests reference `origTxID` — the original bet transaction to reverse.
- The SDK handles request signing for outbound Core API calls automatically.
- All reverse-call signatures MUST be verified using the SDK's parseAndVerify*
  methods — never skip signature verification.

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
   - Handle both `SwipeGamesApiException` and `SwipeGamesValidationException`.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration works (no syntax errors, routes registered).
4. If there are any ambiguities or decisions I need to make, list them.

````

</TabItem>
</Tabs>

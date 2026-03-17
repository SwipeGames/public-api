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

<Tabs>
<TabItem value="node" label="Node.js" default>

**Package:** `@swipegames/integration-sdk`

```bash
npm install @swipegames/integration-sdk
```

- **Registry:** [npm](https://www.npmjs.com/package/@swipegames/integration-sdk)
- **Source:** [GitHub](https://github.com/swipegames/integration-sdk-node)
- **Requirements:** Node.js >= 18, ESM only

</TabItem>
<TabItem value="go" label="Go">

**Module:** `github.com/swipegames/integration-sdk-go`

```bash
go get github.com/swipegames/integration-sdk-go
```

- **Source:** [GitHub](https://github.com/swipegames/integration-sdk-go)
- **Requirements:** Go 1.22+

</TabItem>
<TabItem value="php" label="PHP">

**Package:** `swipegames/integration-sdk`

```bash
composer require swipegames/integration-sdk
```

- **Registry:** [Packagist](https://packagist.org/packages/swipegames/integration-sdk)
- **Source:** [GitHub](https://github.com/swipegames/integration-sdk-php)
- **Requirements:** PHP 8.1+, Guzzle 7.x

</TabItem>
</Tabs>

---

## AI-Assisted Integration

Copy the prompt for your language below and paste it into your AI coding assistant (Claude, Cursor, GitHub Copilot, etc.) to integrate the Swipe Games SDK into your project.

<Tabs>
<TabItem value="node" label="Node.js" default>

````text
I need to integrate the Swipe Games platform into this codebase using their
Node.js SDK.

## SDK Details

- Package: @swipegames/integration-sdk
- Install: npm install @swipegames/integration-sdk
- ESM only — uses "type": "module", cannot be require()'d from CommonJS
- SDK README: https://github.com/swipegames/integration-sdk-node/blob/main/README.md

## API Documentation

Full API docs: https://swipegames.github.io/public-api/

## What the SDK provides

1. **Core API client** (outbound calls to Swipe Games):
   - `createNewGame()` — launch a game and get the game URL
   - `getGames()` — list available games
   - `createFreeRounds()` / `cancelFreeRounds()` — manage free rounds campaigns

2. **Integration Adapter helpers** (inbound reverse calls from Swipe Games):
   - `parseAndVerifyBalanceRequest()` / `parseAndVerifyBetRequest()` /
     `parseAndVerifyWinRequest()` / `parseAndVerifyRefundRequest()`
     — verify signature + parse + validate with Zod in one step
   - `createBalanceResponse()` / `createBetResponse()` / `createWinResponse()` /
     `createRefundResponse()` / `createErrorResponse()` — typed response builders

3. **Error types**: `SwipeGamesApiError`, `SwipeGamesValidationError`

## Client setup

```typescript
import { SwipeGamesClient } from "@swipegames/integration-sdk";

const client = new SwipeGamesClient({
  cid: "your-cid-uuid",
  extCid: "your-ext-cid",
  apiKey: "your-api-key",             // signs outbound Core API requests
  integrationApiKey: "your-int-key",  // verifies inbound reverse calls
  env: "staging",                     // "staging" | "production"
});
```

## Instructions

1. Read the SDK README linked above for complete usage examples.
2. Analyze this codebase to determine which parts of the integration are relevant:
   - If this is a **backend service**: implement the 4 Integration Adapter endpoints
     (GET /balance, POST /bet, POST /win, POST /refund) using the SDK's
     parseAndVerify* methods and response builders.
   - If this is a **user-facing app**: use the Core API client to create game
     sessions and redirect players.
   - If this is a **back-office tool**: use the Core API client for free rounds
     management and game listing.
   - If multiple apply, implement all relevant parts.
3. Use environment variables for all credentials (cid, extCid, apiKey,
   integrationApiKey).
4. If the purpose of this codebase is unclear, ask me before proceeding.
````

</TabItem>
<TabItem value="go" label="Go">

````text
I need to integrate the Swipe Games platform into this codebase using their
Go SDK.

## SDK Details

- Module: github.com/swipegames/integration-sdk-go
- Install: go get github.com/swipegames/integration-sdk-go
- Import as: swipegames "github.com/swipegames/integration-sdk-go"
- SDK README: https://github.com/swipegames/integration-sdk-go/blob/main/README.md

## API Documentation

Full API docs: https://swipegames.github.io/public-api/

## What the SDK provides

1. **Core API client** (outbound calls to Swipe Games):
   - `CreateNewGame()` — launch a game and get the game URL
   - `GetGames()` — list available games
   - `CreateFreeRounds()` / `CancelFreeRounds()` — manage free rounds campaigns

2. **Integration Adapter helpers** (inbound reverse calls from Swipe Games):
   - `ParseAndVerifyBalanceRequest()` / `ParseAndVerifyBetRequest()` /
     `ParseAndVerifyWinRequest()` / `ParseAndVerifyRefundRequest()`
     — verify signature + parse + validate in one step
   - `NewBalanceResponse()` / `NewBetResponse()` / `NewWinResponse()` /
     `NewRefundResponse()` / `NewErrorResponse()` — typed response builders

3. **Error types**: `*APIError` (non-2xx response), `*ValidationError`
   (client-side validation failure)

## Client setup

```go
import swipegames "github.com/swipegames/integration-sdk-go"

client, err := swipegames.NewClient(swipegames.ClientConfig{
    CID:               "your-cid-uuid",
    ExtCID:            "your-ext-cid",
    APIKey:            "your-api-key",          // signs outbound Core API requests
    IntegrationAPIKey: "your-int-key",          // verifies inbound reverse calls
    Env:               swipegames.EnvStaging,   // EnvStaging | EnvProduction
})
```

## Instructions

1. Read the SDK README linked above for complete usage examples.
2. Analyze this codebase to determine which parts of the integration are relevant:
   - If this is a **backend service**: implement the 4 Integration Adapter endpoints
     (GET /balance, POST /bet, POST /win, POST /refund) using the SDK's
     ParseAndVerify* methods and response builders.
   - If this is a **user-facing app**: use the Core API client to create game
     sessions and redirect players.
   - If this is a **back-office tool**: use the Core API client for free rounds
     management and game listing.
   - If multiple apply, implement all relevant parts.
3. Use environment variables for all credentials (CID, ExtCID, APIKey,
   IntegrationAPIKey).
4. If the purpose of this codebase is unclear, ask me before proceeding.
````

</TabItem>
<TabItem value="php" label="PHP">

````text
I need to integrate the Swipe Games platform into this codebase using their
PHP SDK.

## SDK Details

- Package: swipegames/integration-sdk
- Install: composer require swipegames/integration-sdk
- Namespace: SwipeGames\SDK
- SDK README: https://github.com/swipegames/integration-sdk-php/blob/main/README.md

## API Documentation

Full API docs: https://swipegames.github.io/public-api/

## What the SDK provides

1. **Core API client** (outbound calls to Swipe Games):
   - `createNewGame()` — launch a game and get the game URL
   - `getGames()` — list available games
   - `createFreeRounds()` / `cancelFreeRounds()` — manage free rounds campaigns

2. **Integration Adapter helpers** (inbound reverse calls from Swipe Games):
   - `parseAndVerifyBalanceRequest()` / `parseAndVerifyBetRequest()` /
     `parseAndVerifyWinRequest()` / `parseAndVerifyRefundRequest()`
     — verify signature + parse + validate in one step
   - `ResponseBuilder::balanceResponse()` / `::betResponse()` /
     `::winResponse()` / `::refundResponse()` / `::errorResponse()`
     — JsonSerializable response builders

3. **Error types**: `SwipeGamesApiException`, `SwipeGamesValidationException`

4. **Type namespaces**:
   - `SwipeGames\PublicApi\Common` — ErrorResponse, User
   - `SwipeGames\PublicApi\Core` — Core API request/response types
   - `SwipeGames\PublicApi\Integration` — Integration Adapter types

## Client setup

```php
use SwipeGames\SDK\SwipeGamesClient;
use SwipeGames\SDK\Client\ClientConfig;

$client = new SwipeGamesClient(new ClientConfig(
    cid: 'your-cid-uuid',
    extCid: 'your-ext-cid',
    apiKey: 'your-api-key',             // signs outbound Core API requests
    integrationApiKey: 'your-int-key',  // verifies inbound reverse calls
    env: 'staging',                     // 'staging' or 'production'
));
```

## Instructions

1. Read the SDK README linked above for complete usage examples.
2. Analyze this codebase to determine which parts of the integration are relevant:
   - If this is a **backend service**: implement the 4 Integration Adapter endpoints
     (GET /balance, POST /bet, POST /win, POST /refund) using the SDK's
     parseAndVerify* methods and ResponseBuilder helpers.
   - If this is a **user-facing app**: use the Core API client to create game
     sessions and redirect players.
   - If this is a **back-office tool**: use the Core API client for free rounds
     management and game listing.
   - If multiple apply, implement all relevant parts.
3. Use environment variables for all credentials (cid, extCid, apiKey,
   integrationApiKey).
4. If the purpose of this codebase is unclear, ask me before proceeding.
````

</TabItem>
</Tabs>

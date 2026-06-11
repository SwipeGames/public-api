---
id: tools
title: Integration Tools
slug: /tools
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Integration Tools

Everything you need to integrate Swipe Games: an AI coding-agent **skill**, official **SDKs** for Node, Go, and PHP, and ready-to-use **AI prompts**.

## AI-Assisted Integration

Integrate Swipe Games with the help of an AI coding agent — install the skill (recommended) or paste a ready-made prompt.

### Integration Skill (recommended)

We recommend the **Swipe Games Integration Skill** — an [Agent Skill](https://agentskills.io) that teaches your AI coding agent the whole integration. Install it once and:

- it **loads automatically** whenever you work on Swipe Games — no prompt to find or re-paste;
- it **stays current** with the platform as the API evolves;
- it **adapts to your project** — using our official SDK for Node, Go, or PHP, or working directly against the HTTP API for any other language (Python, Ruby, C#, Java, …).

It wires up the Core API and the four signed reverse-call endpoints (`GET /balance`, `POST /bet`, `POST /win`, `POST /refund`) with correct signature verification, idempotency, and error handling. Install with:

```bash
npx skills add swipegames/public-api
```

### AI prompts

Prefer to paste the instructions yourself, or using an agent that can't run the `skills` CLI? Copy the prompt for your language below and paste it into your AI coding assistant (Claude, Cursor, GitHub Copilot, etc.) to integrate Swipe Games into your project.

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

- All monetary amounts are decimal strings in the currency's MAIN unit, not cents
  (e.g., "0.90" = €0.90, "100.10" = €100.10). Never use floating-point math on them;
  if you store another unit (e.g. integer cents), convert at the boundary with
  integer/string arithmetic.
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
- Do NOT do floating-point math on money — amounts are main-unit decimal strings
  (e.g. "0.90"); convert with integer/string arithmetic if your store uses another unit.
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

- All monetary amounts are decimal strings in the currency's MAIN unit, not cents
  (e.g., "0.90" = €0.90, "100.10" = €100.10). Never use floating-point math on them;
  if you store another unit (e.g. integer cents), convert at the boundary with
  integer/string arithmetic.
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
- Do NOT do floating-point math on money — amounts are main-unit decimal strings
  (e.g. "0.90"); convert with integer/string arithmetic if your store uses another unit.
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

- All monetary amounts are decimal strings in the currency's MAIN unit, not cents
  (e.g., "0.90" = €0.90, "100.10" = €100.10). Never use floating-point math on them;
  if you store another unit (e.g. integer cents), convert at the boundary with
  integer/string arithmetic.
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
- Do NOT do floating-point math on money — amounts are main-unit decimal strings
  (e.g. "0.90"); convert with integer/string arithmetic if your store uses another unit.
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
<TabItem value="manual" label="No SDK / other language">

For Python, Ruby, C#, Java, or any language without an official SDK. The SDKs are
thin wrappers over the public API, so an agent can implement the same integration
directly against the HTTP API and OpenAPI specs.

````text
You are helping me integrate the Swipe Games platform into this codebase. There is
no official SDK for this language, so implement directly against the public HTTP API
and OpenAPI specs.

## Goal

Set up the Swipe Games integration by generating types/stubs from the OpenAPI specs
and implementing the integration directly, connecting whichever parts of the API are
relevant to this project's purpose.

## Success Criteria

1. Generate request/response types (and reverse-call server stubs) from the OpenAPI
   specs rather than hand-rolling shapes.
2. Implement all integration points relevant to this codebase (see Analysis step).
3. Every inbound reverse call must have its X-REQUEST-SIGN signature verified.
4. All credentials must come from environment variables, never hardcoded.
5. Explain what you changed and why.

**You are NOT done until the integration builds, credentials are externalized, and
all relevant endpoints are wired up with signature verification.**

## Specs & docs

- Core API spec: https://raw.githubusercontent.com/swipegames/public-api/main/api/v1.0/core/api.yaml
- Integration Adapter spec: https://raw.githubusercontent.com/swipegames/public-api/main/api/v1.0/swipegames-integration/api.yaml
- Full API documentation: https://swipegames.github.io/public-api/
- Signing rules (read this first): https://swipegames.github.io/public-api/swipegames-integration#verifying-request-signatures
- Canonical JSON form: https://swipegames.github.io/public-api/authn#json-canonical-form

If an OpenAPI generator exists for your language (openapi-generator, etc.), use it
for the request/response types and the reverse-call server stubs; otherwise write
the types from the spec by hand.

## Configuration (from env vars)

SWIPEGAMES_CID, SWIPEGAMES_EXT_CID, SWIPEGAMES_API_KEY (signs outbound),
SWIPEGAMES_INTEGRATION_API_KEY (verifies inbound), SWIPEGAMES_ENV.

Staging base URL: https://staging.platform.0.swipegames.io/api/v1 — confirm the
production host in the docs before going live.

## Signing — the only hard part, get it exactly right

**Outbound Core API calls (you → Swipe Games):** serialize the body as canonical
JSON (keys sorted alphabetically, no whitespace), compute
X-REQUEST-SIGN = HMAC-SHA256(canonicalBody, SWIPEGAMES_API_KEY) as lowercase hex,
and send it as a header.

**Inbound reverse calls (Swipe Games → you):** verify keyed with
SWIPEGAMES_INTEGRATION_API_KEY, using a constant-time comparison.
- POST /bet, /win, /refund: the body is already canonical JSON — sign the RAW bytes
  (do not parse and re-serialize).
- GET /balance: no body — build canonical JSON from ALL query params (keys sorted,
  no whitespace, do not escape non-ASCII), then sign that string.

POST verifies the raw bytes as received, so it can't drift — only GET reconstructs the
signed string, so it's the fragile one: get it byte-exact and confirm it against a real
signed /balance call. The signing-rules link above has copy-pasteable worked examples
(JavaScript, Python, Go, PHP) — match them exactly.

## Important Constraints

- All monetary amounts are decimal strings in the currency's MAIN unit, not cents
  (e.g., "0.90" = €0.90, "100.10" = €100.10). Never use floating-point math on them;
  if you store another unit (e.g. integer cents), convert at the boundary with
  integer/string arithmetic.
- The sessionID in reverse calls is the one we provided when launching the game —
  use it to identify the player/session in our system.
- The platform enforces a 5-second timeout on all reverse calls. Keep handlers fast.
- Bet transactions must be idempotent — use txID as the idempotency key; on a retry
  (same txID) return the same 200 response instead of applying it twice.
- Retry/refund policy: a bet is NOT retried — return 500 (or time out) when you want
  an automatic refund; other 4xx are not refundable. Win is retried until 200. Refund
  is retried until 200 and must return 200 even if no matching transaction exists.
- During free rounds, bet/win requests arrive with type: "free" and an frID. See
  https://swipegames.github.io/public-api/free-rounds for handling details.
- Refund requests reference origTxID — the original bet transaction to reverse.

## Common Mistakes — Do NOT

- Do NOT parse and re-serialize a POST body before verifying — sign the raw bytes.
- Do NOT do floating-point math on money — amounts are main-unit decimal strings
  (e.g. "0.90"); convert with integer/string arithmetic if your store uses another unit.
- Do NOT generate your own txID — use the one provided by the platform in each
  reverse call as the idempotency key.
- Do NOT hardcode credentials — always use environment variables.

---

## What I Want From You

### Step 1 — Analysis

Inspect this codebase and determine:
1. The language and runtime it's written in — this drives the generator, types, and
   idioms. If it turns out to be Node, Go, or PHP, tell me before continuing: those
   have official SDKs, which are a better path than implementing against the API by
   hand.
2. What kind of project this is (backend service, user-facing app, back-office
   tool, or a combination).
3. What HTTP framework/router is in use and where routes are defined.
4. Where environment variables are managed.
5. Whether there's an existing wallet/balance/ledger system to connect to.
6. Which OpenAPI generator fits this language — if none does, hand-write the
   request/response types from the spec instead.

Based on this analysis, determine which parts of the integration apply:
- **Backend service** → Integration Adapter endpoints (balance, bet, win, refund)
- **User-facing app** → Core API (list games, create game sessions, redirect players)
- **Back-office tool** → Core API (free rounds management, game listing)
- **Multiple** → implement all relevant parts

If the language or the project's purpose is unclear, ask me before proceeding.

### Step 2 — Implementation

1. Generate types/stubs from the OpenAPI specs above.
2. Create a client/config module that reads the environment variables.
3. Implement the relevant integration points identified in Step 1.
4. For outbound Core API calls: sign each request per the signing rules above.
5. For Integration Adapter endpoints:
   - Wire up all 4 reverse-call handlers using our framework's routing.
   - Verify the X-REQUEST-SIGN signature on every inbound request.
   - Return the response shapes from the Integration spec, each echoing our own
     transaction id.
   - Make bet/win/refund idempotent on txID.
   - Handle the insufficient_funds case on bet, and free rounds (type: "free") if
     applicable.
6. If this codebase already has a testing suite, add test coverage for the new
   integration code — including a round-trip test of your signing against the
   documented examples. Do not set up a testing framework from scratch.
7. If this codebase has existing documentation, update it to reflect the integration.

### Step 3 — Verification

1. Show me the exact files changed and why.
2. List all environment variables I need to set.
3. Confirm the integration builds and the endpoints are reachable.
4. Round-trip the signing: the same key + same body must produce the same signature
   as the documented examples.
5. If tests were added, verify they pass.
6. If there are any ambiguities or decisions I need to make, list them.

````

</TabItem>
</Tabs>

---

## SDKs

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

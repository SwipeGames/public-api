# Node / TypeScript — official SDK

Package `@swipegames/integration-sdk`. **ESM only** (`"type": "module"`) — cannot be `require()`'d from CommonJS; use `import` or a dynamic `await import()`. Requires Node >= 18.

```bash
npm install @swipegames/integration-sdk
```

## Client

Two keys: `apiKey` signs outbound Core API calls; `integrationApiKey` verifies inbound reverse calls.

```typescript
import { SwipeGamesClient } from "@swipegames/integration-sdk";

const client = new SwipeGamesClient({
  cid: process.env.SWIPEGAMES_CID!,                              // Swipe Games-assigned Client ID
  extCid: process.env.SWIPEGAMES_EXT_CID!,                       // your External Client ID
  apiKey: process.env.SWIPEGAMES_API_KEY!,                       // signs outbound Core API calls
  integrationApiKey: process.env.SWIPEGAMES_INTEGRATION_API_KEY!,// verifies inbound reverse calls
  env: (process.env.SWIPEGAMES_ENV as "staging" | "production") ?? "staging",
  // baseUrl: "https://custom..."  // optional, overrides env
});
```

## Core API (you → Swipe Games)

```typescript
const { gameURL, gsID } = await client.createNewGame({
  gameID: "sg_catch_97", demo: false, platform: "desktop", // "desktop" | "mobile"
  currency: "USD", locale: "en_us",
  sessionID: "session-123",          // optional; echoed back in reverse calls — use it to identify the player
  // returnURL, depositURL, initDemoBalance, user — all optional
});

const games = await client.getGames();                      // GameInfo[]
await client.createFreeRounds({ extID, currency, quantity, betLine, validFrom /* ... */ });
await client.cancelFreeRounds({ id });                      // or { extID }
```

## Reverse calls (Swipe Games → you)

Read `references/reverse-calls.md` first. Use `parseAndVerify*` — it verifies the signature, parses the body, and zod-validates. Build responses with the `create*Response` helpers. **Capture the raw request body** before any JSON middleware reparses it — the signature is computed over the raw bytes.

```typescript
import {
  createBalanceResponse, createBetResponse, createWinResponse,
  createRefundResponse, createErrorResponse,
} from "@swipegames/integration-sdk";

// GET /balance
const r = client.parseAndVerifyBalanceRequest(queryParams, req.headers["x-request-sign"]);
if (!r.ok) return res.status(401).json(r.error);
return res.json(createBalanceResponse(getBalance(r.query.sessionID)));

// POST /bet  (raw body string + signature header)
const bet = client.parseAndVerifyBetRequest(rawBody, req.headers["x-request-sign"]);
if (!bet.ok) return res.status(401).json(bet.error);
// idempotency: if bet.body.txID already processed, return the same 200 response
if (!hasFunds(bet.body.sessionID, bet.body.amount)) {
  return res.status(400).json(createErrorResponse({ message: "Not enough balance", code: "insufficient_funds" }));
}
const balance = deductFromWallet(bet.body.sessionID, bet.body.amount);
return res.json(createBetResponse(balance, yourTxID));
```

`parseAndVerifyWinRequest` / `parseAndVerifyRefundRequest` follow the same shape, paired with `createWinResponse` / `createRefundResponse`. A lower-level boolean check (`verifyBetRequest`, etc.) exists if you parse the body yourself. See `references/error-codes.md` for the code list.

## Errors (Core API)

- `SwipeGamesApiError` — non-2xx from the platform: `.status`, `.message`, `.code`, `.details`.
- `SwipeGamesValidationError` — client-side zod failure before the request is sent: `.zodError`.

Set `debug: true` in the client config to log every Core API request/response (`[SwipeGamesSDK]` prefix).

## Verify

```bash
npm run build      # or: npx tsc --noEmit
npm test           # if a suite exists
```

Full README: https://github.com/swipegames/integration-sdk-node/blob/main/README.md

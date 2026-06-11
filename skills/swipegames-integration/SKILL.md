---
name: swipegames-integration
description: Integrate the Swipe Games casino platform into a codebase. Covers the official Node, Go, and PHP SDKs, plus a manual path for any other language (Python, Ruby, C#, Java, ...) implemented directly against the public API. Wires up Core API calls (launch games, list games, free-rounds campaigns) and the four inbound reverse-call endpoints (GET /balance, POST /bet, POST /win, POST /refund) with X-REQUEST-SIGN signature verification. Use this skill when integrating Swipe Games, implementing the Swipe Games Integration Adapter, building a wallet/balance integration, handling bet/win/refund/balance reverse calls, verifying request signatures, or using @swipegames/integration-sdk, integration-sdk-go, or swipegames/integration-sdk.
---

# Swipe Games Integration

Integrate the Swipe Games platform into this codebase. There are two halves:

- **Core API** (you → Swipe Games): launch games, list games, manage free-rounds campaigns.
- **Integration Adapter** (Swipe Games → you): four inbound *reverse-call* endpoints — `GET /balance`, `POST /bet`, `POST /win`, `POST /refund` — that the platform calls to read balance and move money. Every reverse call is HMAC-signed and must be verified.

## Step 1 — Analyze the project (do this first)

Inspect the codebase and determine:

1. **Language / runtime** → selects the implementation path:
   - Node / TypeScript, Go, or PHP → official SDK. Read `references/node.md`, `references/go.md`, or `references/php.md`.
   - Any other language (Python, Ruby, C#, Java, ...) → no SDK. Read `references/manual.md`.
2. **Project type** → selects which halves apply:
   - Backend / wallet service → Integration Adapter endpoints (balance, bet, win, refund).
   - Player-facing app → Core API (list games, create a session, redirect to `gameURL`).
   - Back-office tool → Core API (free-rounds management, game listing).
   - A mix → implement all relevant parts.
3. Framework + where HTTP routes and env vars live; any existing wallet / balance / ledger to connect to.

If the project's purpose is unclear, ask before proceeding.

## Step 2 — Read the references you need

- The **language file** chosen above — install, client setup, exact method names, examples.
- `references/reverse-calls.md` — **read before implementing any reverse-call handler.** Idempotency, retries, refunds, free rounds, timeouts.
- `references/error-codes.md` — error responses and the error-code list.

## Step 3 — Implement

1. Configure credentials from **environment variables** (never hardcode):
   `SWIPEGAMES_CID`, `SWIPEGAMES_EXT_CID`, `SWIPEGAMES_API_KEY`, `SWIPEGAMES_INTEGRATION_API_KEY`, `SWIPEGAMES_ENV` (`staging` | `production`).
2. **Core API**: wrap client calls in the app's service / controller layer; handle errors per the language reference.
3. **Integration Adapter** endpoints (if applicable):
   - Wire all four handlers into the app's router.
   - **Verify the `X-REQUEST-SIGN` signature on every inbound request** (SDK `parseAndVerify*`, or manual verification per `references/manual.md`).
   - Return typed responses; echo back **your** side's transaction id.
   - Handle `insufficient_funds` on bet; handle free rounds (`type: "free"`) if applicable.
   - Make bet / win / refund **idempotent on `txID`** (see `references/reverse-calls.md`).
4. If the project has a test suite, add coverage for the new code — do **not** scaffold a test framework from scratch.
5. If it has docs / a README, update them to reflect the integration.

## Step 4 — Verify

- List the files changed and why, and the env vars the human must set.
- Confirm it compiles / builds (command is in the language reference).
- Run any added tests.
- Surface any decisions or ambiguities for the human to resolve.

## Hard rules — never

- **Never** roll your own signature verification when an SDK is available — use `parseAndVerify*`.
- **Never** do floating-point math on money. Amounts and balances are **decimal strings in the currency's main unit** — *not* cents (e.g. `"0.90"` = €0.90, `"100.10"` = €100.10). Keep them as strings; if your wallet stores another unit (e.g. integer cents), convert at the boundary with integer/string arithmetic, never `parseFloat`/divide.
- **Never** generate your own `txID` for a reverse call — the platform's `txID` is the idempotency key; return your own transaction id in the response body.
- **Never** hardcode credentials.

Full API reference: https://swipegames.github.io/public-api/

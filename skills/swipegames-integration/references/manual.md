# Any other language — implement directly against the public API

No official SDK exists for this language, but the SDKs are thin wrappers — you can implement the same integration against the HTTP API. **Generate types/stubs from the OpenAPI spec rather than hand-rolling shapes**, and get the signing exactly right (it is the only hard part).

## OpenAPI specs (generate clients/stubs from these)

- Core API: https://raw.githubusercontent.com/swipegames/public-api/main/api/v1.0/core/api.yaml
- Integration Adapter: https://raw.githubusercontent.com/swipegames/public-api/main/api/v1.0/swipegames-integration/api.yaml
- Rendered docs: https://swipegames.github.io/public-api/

Use this language's OpenAPI generator (openapi-generator, oapi-codegen, etc.) for the request/response types and, for the reverse calls, the server stubs.

## Config (from env vars)

`SWIPEGAMES_CID`, `SWIPEGAMES_EXT_CID`, `SWIPEGAMES_API_KEY` (signs outbound), `SWIPEGAMES_INTEGRATION_API_KEY` (verifies inbound), `SWIPEGAMES_ENV`.

Staging base URL: `https://staging.platform.0.swipegames.io/api/v1`. Confirm the production host in the docs before going live.

## Outbound Core API calls (you → Swipe Games)

For each request: serialize the body as **canonical JSON** (keys sorted alphabetically, no whitespace), compute `X-REQUEST-SIGN = HMAC-SHA256(canonicalBody, SWIPEGAMES_API_KEY)` as lowercase hex, and send it as a header. Include `cID` / `extCID` per the spec.

Canonical JSON form: https://swipegames.github.io/public-api/authn#json-canonical-form

## Inbound reverse calls (Swipe Games → you) — verify EVERY request

Read `references/reverse-calls.md` for the semantics (idempotency, retries, refunds, free rounds, 5s timeout). Verification is keyed with your **Integration API key**:

**POST `/bet`, `/win`, `/refund`** — the body is already canonical JSON. Sign the **raw bytes** (do not parse and re-serialize):

```
expected = hex( HMAC_SHA256(rawBody, integrationApiKey) )
valid    = constantTimeEquals(expected, header["X-REQUEST-SIGN"])
```

**GET `/balance`** — no body. Build canonical JSON from the query params (keys sorted, no whitespace), then sign that string:

```
payload  = canonicalJSON({ ...queryParams })   // build from ALL params received; the spec documents {"sessionID":".."}
expected = hex( HMAC_SHA256(payload, integrationApiKey) )
```

**Asymmetry — POST is robust, GET is the fragile one.** For POST you verify the **raw bytes as received**, so your verification can't drift from the platform. For GET you must *reconstruct* the signed string, so it has to be byte-exact: include **all** query params, sort keys, no whitespace, and match the documented canonical form (in Python: `json.dumps(params, sort_keys=True, separators=(",", ":"), ensure_ascii=False)` — do **not** `\u`-escape non-ASCII). Confirm your GET form against a real signed `/balance` call before going live.

Worked, copy-pasteable examples in JavaScript, Python, Go, and PHP:
https://swipegames.github.io/public-api/swipegames-integration#verifying-request-signatures

## Response bodies

Return the response shapes from the Integration spec (`balance` / `bet` / `win` / `refund`), each echoing **your** transaction id. For errors return `{ message, code?, action? }` — see `references/error-codes.md`. Mind the bet-refundability rule (return `500` when you want a refund) in `references/reverse-calls.md`.

## Verify

- Round-trip your signing against the documented examples: same key + same body must produce the same signature.
- Confirm all four endpoints verify the signature and are idempotent on `txID`.
- Confirm the project compiles and any tests pass.

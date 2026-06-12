# Go — official SDK

Package `github.com/swipegames/integration-sdk-go`. Requires Go >= 1.13. The reverse-call handlers are plain `net/http` — wire them into whatever router you use (`net/http`, chi, gin, Echo, ...).

```bash
go get github.com/swipegames/integration-sdk-go@latest
```

Always pull the **latest** SDK — there is a single live API version. The same `@latest` upgrades an existing dependency.

## Client

Two keys: `APIKey` signs outbound Core API calls; `IntegrationAPIKey` verifies inbound reverse calls. `NewClient` returns an error — check it.

```go
import swipegames "github.com/swipegames/integration-sdk-go"

client, err := swipegames.NewClient(swipegames.ClientConfig{
	CID:               os.Getenv("SWIPEGAMES_CID"),                 // Swipe Games-assigned Client ID
	ExtCID:            os.Getenv("SWIPEGAMES_EXT_CID"),             // your External Client ID
	APIKey:            os.Getenv("SWIPEGAMES_API_KEY"),             // signs outbound Core API calls
	IntegrationAPIKey: os.Getenv("SWIPEGAMES_INTEGRATION_API_KEY"), // verifies inbound reverse calls
	Env:               swipegames.EnvStaging,                       // EnvStaging | EnvProduction
	// BaseURL: "https://custom..."  // optional, overrides Env
})
```

## Core API (you → Swipe Games)

Every method takes a `context.Context`; the client signs each outbound call automatically.

```go
resp, err := client.CreateNewGame(ctx, swipegames.CreateNewGameParams{
	GameID: "sg_catch_97", Demo: false, Platform: swipegames.PlatformDesktop, // PlatformDesktop | PlatformMobile
	Currency: "USD", Locale: "en_us",
	SessionID: "session-123", // optional; echoed back in reverse calls — use it to identify the player
	// ReturnURL, DepositURL, InitDemoBalance, User — all optional
})
// resp.GameURL → launch URL;  resp.GsID → game session ID

games, err := client.GetGames(ctx)                       // []GameInfo
_, err = client.CreateFreeRounds(ctx, swipegames.CreateFreeRoundsParams{ExtID, Currency, Quantity, BetLine, ValidFrom /* ... */})
err = client.CancelFreeRounds(ctx, swipegames.CancelFreeRoundsParams{ID: "fr-123"}) // or {ExtID: "campaign-1"}
```

## Reverse calls (Swipe Games → you)

Read `references/reverse-calls.md` first. `ParseAndVerify*` verifies the signature, parses the body, validates required fields, and returns `(parsed, verifyErr)`. On failure, `verifyErr.Response()` is the ready-to-send error body. Build success responses with `New*Response`. **Read the raw request body before any JSON middleware consumes it** — the signature is computed over the raw bytes.

```go
import "io"

// GET /balance — verification runs over the query params
func handleBalance(w http.ResponseWriter, r *http.Request) {
	params := map[string]string{}
	for k, v := range r.URL.Query() {
		params[k] = v[0]
	}
	query, verifyErr := client.ParseAndVerifyBalanceRequest(params, r.Header.Get("X-REQUEST-SIGN"))
	if verifyErr != nil {
		writeJSON(w, 401, verifyErr.Response())
		return
	}
	writeJSON(w, 200, swipegames.NewBalanceResponse(getBalance(query.SessionID)))
}

// POST /bet — verification runs over the raw body
func handleBet(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	bet, verifyErr := client.ParseAndVerifyBetRequest(string(body), r.Header.Get("X-REQUEST-SIGN"))
	if verifyErr != nil {
		writeJSON(w, 401, verifyErr.Response())
		return
	}
	// idempotency: if bet.TxID is already processed, return the same 200 response
	if !hasFunds(bet.SessionID, bet.Amount) {
		writeJSON(w, 400, swipegames.NewErrorResponse(swipegames.ErrorResponseOpts{
			Message: "Not enough balance", Code: swipegames.ErrorCodeInsufficientFunds,
		}))
		return
	}
	balance := deductFromWallet(bet.SessionID, bet.Amount)
	writeJSON(w, 200, swipegames.NewBetResponse(balance, yourTxID))
}
```

(`writeJSON` is your own helper: set `Content-Type: application/json`, the status, and encode the body.) `ParseAndVerifyWinRequest` / `ParseAndVerifyRefundRequest` follow the same shape, paired with `NewWinResponse` / `NewRefundResponse` (the refund request carries `.OrigTxID`). A lower-level boolean check (`VerifyBetRequest`, etc.) exists if you parse the body yourself. See `references/error-codes.md` for the code list and `swipegames.ErrorCode*` / `swipegames.ErrorAction*` constants.

## Errors (Core API)

Match both with `errors.As`:

- `*swipegames.APIError` — non-2xx from the platform: `.StatusCode`, `.Message`, `.Code`, `.Details`.
- `*swipegames.ValidationError` — client-side validation before the request is sent: `.Message`, `.Field`.

Set `Debug: true` in the client config to log every Core API request/response (`[SwipeGamesSDK]` prefix).

## Verify

```bash
go build ./...
go vet ./...
go test ./...   # if a suite exists
```

Full README: https://github.com/swipegames/integration-sdk-go/blob/main/README.md

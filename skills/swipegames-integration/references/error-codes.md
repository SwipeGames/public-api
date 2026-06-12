# Error responses & codes

When a reverse-call handler must fail, return an error body. `message` **may be shown to the end user**, so keep it user-friendly. `details` is for your own debugging and is never shown. Some errors support an `action` the platform's client can execute.

## Building an error

- **SDK**: `createErrorResponse({ message, code?, action? })` (Node), `ResponseBuilder` (PHP), or the equivalent in Go — see the language reference.
- **Manual**: return JSON `{ "message": "...", "code": "...", "action": "..." }`. Choose the status carefully — see the bet refundability rule in `references/reverse-calls.md` (use `500` when you want a refund issued).

## Codes

| Code                      | Meaning                                   |
| ------------------------- | ----------------------------------------- |
| `game_not_found`          | Game does not exist                       |
| `currency_not_supported`  | Currency not supported                    |
| `locale_not_supported`    | Locale not supported                      |
| `account_blocked`         | Player account is blocked                 |
| `bet_limit`               | Bet limit exceeded                        |
| `loss_limit`              | Loss limit exceeded                       |
| `time_limit`              | Time limit exceeded                       |
| `insufficient_funds`      | Not enough balance (the common bet reject) |
| `session_expired`         | Session has expired                       |
| `session_not_found`       | Session does not exist                    |
| `client_connection_error` | Connection error to your system           |

The one to handle explicitly almost everywhere is **`insufficient_funds`** on `POST /bet`.

Spec: https://swipegames.github.io/public-api/swipegames-integration

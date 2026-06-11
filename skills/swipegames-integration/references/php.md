# PHP — official SDK

Package `swipegames/integration-sdk`. Requires PHP >= 8.1 and Guzzle 7.x. Wire the reverse-call handlers into whatever framework you use (Laravel, Symfony, Slim, plain PHP).

```bash
composer require swipegames/integration-sdk
```

## Client

Two keys: `apiKey` signs outbound Core API calls; `integrationApiKey` verifies inbound reverse calls.

```php
use SwipeGames\SDK\SwipeGamesClient;
use SwipeGames\SDK\Client\ClientConfig;

$client = new SwipeGamesClient(new ClientConfig(
    cid: getenv('SWIPEGAMES_CID'),                               // Swipe Games-assigned Client ID
    extCid: getenv('SWIPEGAMES_EXT_CID'),                        // your External Client ID
    apiKey: getenv('SWIPEGAMES_API_KEY'),                        // signs outbound Core API calls
    integrationApiKey: getenv('SWIPEGAMES_INTEGRATION_API_KEY'), // verifies inbound reverse calls
    env: getenv('SWIPEGAMES_ENV') ?: 'staging',                 // 'staging' | 'production'
    // baseUrl: 'https://custom...'  // optional, overrides env
));
```

## Core API (you → Swipe Games)

The client signs every outbound call automatically. Params are associative arrays; responses are typed objects with getters.

```php
$result = $client->createNewGame([
    'gameID' => 'sg_catch_97', 'demo' => false, 'platform' => 'desktop', // 'desktop' | 'mobile'
    'currency' => 'USD', 'locale' => 'en_us',
    'sessionID' => 'session-123', // optional; echoed back in reverse calls — use it to identify the player
    // returnURL, depositURL, initDemoBalance, user — all optional
]);
$result->getGameUrl(); // launch URL
$result->getGsId();    // game session ID

$games = $client->getGames();                            // GameInfo[]; pass excludeBetLines: true to slim the payload
$client->createFreeRounds(['extID' => 'campaign-1', 'currency' => 'USD', 'quantity' => 10, 'betLine' => 1, 'validFrom' => '2026-01-01T00:00:00.000Z']);
$client->cancelFreeRounds(['id' => 'campaign-uuid']);    // or ['extID' => 'campaign-1']
```

## Reverse calls (Swipe Games → you)

Read `references/reverse-calls.md` first. `parseAndVerify*` verifies the signature, parses the body, and validates it, returning a result with `->ok`, `->error`, and `->body`. Build responses with `ResponseBuilder` (the objects are `JsonSerializable` — `json_encode` them). **Read the raw request body** (`php://input`) and verify against that — the signature is over the raw bytes, so do not let a framework reparse it first.

```php
use SwipeGames\SDK\Handler\ResponseBuilder;

// POST /bet
$rawBody = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_REQUEST_SIGN'] ?? null;

$result = $client->parseAndVerifyBetRequest($rawBody, $signature);
if (!$result->ok) {
    http_response_code(401);
    echo json_encode($result->error);
    return;
}
$bet = $result->body; // BetRequest
// idempotency: if $bet->getTxId() is already processed, return the same 200 response
if (!hasFunds($bet->getSessionId(), $bet->getAmount())) {
    http_response_code(402);
    echo json_encode(ResponseBuilder::errorResponse(
        message: 'Not enough balance',
        code: 'insufficient_funds',
    ));
    return;
}
$balance = deductFromWallet($bet->getSessionId(), $bet->getAmount());
echo json_encode(ResponseBuilder::betResponse($balance, $yourTxID));
```

For **GET /balance**, call `parseAndVerifyBalanceRequest($_GET, $signature)` (`->body` is an array) and reply with `ResponseBuilder::balanceResponse($balance)`. `parseAndVerifyWinRequest` / `parseAndVerifyRefundRequest` follow the same shape as bet, paired with `ResponseBuilder::winResponse` / `refundResponse` (the refund request carries `getOrigTxId()`). Request objects expose `getSessionId()`, `getAmount()`, `getTxId()`, `getRoundId()`, `getType()` (`'regular'` | `'free'`), and `getFrId()`. A lower-level boolean check (`verifyBetRequest`, etc.) exists if you parse the body yourself. See `references/error-codes.md` for the code list (`ResponseBuilder::errorResponse` also accepts `action:`, `actionData:`, `details:`).

## Errors (Core API)

```php
use SwipeGames\SDK\Exception\SwipeGamesApiException;
use SwipeGames\SDK\Exception\SwipeGamesValidationException;
```

- `SwipeGamesApiException` — non-2xx (or a network error) from the platform: `->statusCode` (`0` for network errors), `->errorCode`, `->details`.
- `SwipeGamesValidationException` — client-side validation before the request is sent: `->getMessage()`.

Pass `debug: true` (with a PSR-3 `logger:`) in `ClientConfig` to log every Core API request/response (`[SwipeGamesSDK]` prefix).

## Verify

```bash
composer install
vendor/bin/phpunit   # if a suite exists
```

Full README: https://github.com/swipegames/integration-sdk-php/blob/main/README.md

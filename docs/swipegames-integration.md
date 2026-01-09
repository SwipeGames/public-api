---
id: swipegames-integration
title: Swipe Games Public Integration Adapter API
slug: /swipegames-integration
---

We use this integration adapter API to make reverse calls back to integrations.  
It's located in our cluster and sends requests to your endpoints on every game actions (mostly related to money processing) - like bets, wins, refunds, etc.

### Setup and configuration

You need to provide us with the following information to set up the integration:

-   `ExtCID` - this is a unique identifier for your internal client (casino, operator, etc.).
    You can use any string, but it should be unique across all integrations.
-   Base URL of your integration API (e.g., `https://example.com/api/v1.0`), we will setup all the endpoints for you according to the API specification.  
    Please make sure that you provide exact endpoints for each action. You can use our OpenAPI specification to generate the server stubs for your API.
-   Your API key for authentication, we will use it to sign the requests to your API. Please read more in [Authentication](#authn) section.

All settings are done against every `ExtCID`. So if you have multiple clients (casinos, operators, etc.), you need to provide us with the `ExtCID` for each of them.

### Please whitelist our IP addresses to allow requests from our servers to your API.

#### Staging environment

-   18.185.156.20

#### Production environment
-   3.65.138.8

### Rounds, transactions and idempotency

Every game round usually consists of the sequence of actions:

-   bet - player places a `bet` in the game
-   win - player `wins` some money in the game (or 0 if no `win`)
-   refund - usually we send a `refund` request when the `bet` request failed.

Every round has a single `RoundID` identifier, which is used to identify the round across all actions. `RoundID` could be not unique across different games, so you should use it only in the context of the game.

Every action request contains the `TxID` - transaction ID, which is used to identify the specific action in the round, and also related
to money processing. We requre integrations to send us back the `TxID` in the response, which is `transaction ID` on the integration side, related to this action/ transaction. `TxID` could be used as idempotency key, means if we retry the same `win` it will contain the same `TxID` as previous request, so you can safely ignore it if already processed this transaction. Please notice in this case you have to reply with 200(OK) status code, so we know that you processed the request and don't retry it again.

All requests from our platform to your should be processed in an idempotent way.
This means that if we send the same request multiple times, the result should be the same as if we sent the request only once.
This is crucial to avoid any issues within our integration in case of network problems or other issues.
We use `txID` field to ensure idempotency.

### Retry and refund policies

#### Bet

All error codes except 200 (OK) are considered as errors. We decline game's action in case of any error and player gets notification about it.

Timeout over than 5 seconds will be considered as an error as well and refund will be issued afterwards in this case.
In case of any 500 error from your side we will issue refund as well.
All other errors aren't refundable, so if you want some transaction to be refundable, please return 500 error code.
We don't retry bet requests.

#### Win

All error codes except 200 (OK) are considered as errors. We don't decline bet action in case of win error, but we show this error to the end user.
In case of any error we will retry win request as long as you respond to our request with error.
All retrying `wins` will have the same `txID` and `roundID`, we don't use different `txID` for `win` retries.
Timeout over than 5 seconds will be considered as an error as well and win will be retried as well.
We don't send any `refunds` on win requests.

#### Refund

In case of any refund we will retry `refund` request as long as you respond to our request `error`.
All retrying refunds will have the same `txID` and `roundID`, we don't use different `txID` for retries.

**Note:** Since we are waiting for 200 OK response from your side on refund request, you should not return any error codes in case if you don't have such transaction on your side. E.g. when we break connection in case of timeout, we will retry `refund` request and you should return 200 OK response with empty body, even if you don't have this transaction on your side.

### Errors processing and client actions

In error your can return any useful information to our side, later this could be useful to track and debug some issues.
Please notice that we don't show `details` to the end user, so you can return any error you want (for debugging purposes),
but `message` could be shown to the end user, so it should be user-friendly and understandable. See more in API specification.

Also we have special `actions` which allow our client to execute some actions on client's side. See more in API specification.

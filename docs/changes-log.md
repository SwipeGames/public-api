---
id: changes-log
title: Changes Log
slug: /changes-log
---

# Changes Log

## 1.10.1

- Integration: fix `Win` reverse call docs — `amount` and `type` described the bet instead of the win; corrected win/refund response `txID` examples.
- Core: fix `GET /free-rounds` `id` description ("free bet" → "free rounds identifier").
- Docs: fix `authn` signing examples to use a valid `locale` (`en_us` instead of `en-US`).

## 1.10.0

- Core: added the optional `fallbackToDefaultLocale` flag to [Create new game](/core/create-new-game). When `true` and the requested `locale` is not supported, the game is created with the default locale (`en_us`) instead of returning `400 locale_not_supported`. Documented the default locale on the [Locales](/locales) page.
- Core: corrected the documented error responses of [Create new game](/core/create-new-game) to match the implementation — added the previously-undocumented `400` (`currency_not_supported` / `locale_not_supported`) and `403` (`account_blocked` / `game_not_found`) responses, each listing only the error codes it actually returns (the `401` / `500` responses no longer advertise business error codes).

## 1.9.0

- Core: added `GET /free-rounds` to read a free-rounds campaign by its internal `id` or external `extID` — returns status source data (quantity, maxBet, maxMult, currency, validity window, and cancellation).

## 1.8.2

- Updated the list of [supported currencies](/currencies).
- **Correction:** fiat currencies carry **up to** 2 decimal places — some (`JPY`, `KRW`, `VND`, …) carry none. The Integration Adapter spec previously said we support 2 decimal places for all fiat currencies. If you assumed exactly 2 everywhere, re-check your rounding.

## 1.8.1

- Go: dropped the unused `github.com/swipegames/platform-lib-common` dependency, so importing the Go packages no longer requires access to a private module.

## 1.8.0

- Added the `currencyFilters` and `additionalCurrencies` query parameters to [Get Games Information](/core/get-games-information), letting you narrow each game's `currencies` and `betLines` to the currency types you support. Omitting `currencyFilters` returns all non-virtual currencies, as before.

## 1.7.5

- Games: added live demo reference to swipegames.io/games

## 1.7.4

- no changes

## 1.7.3

- Add a **Game Session** entry to the [Terms](/terms#game-session) glossary and remove the standalone Game Session page.
- Document the `gameURL` and `gsID` fields of the [Create New Game](/core/create-new-game) response.
- Clarify that the response `gsID` (Swipe Games's Game Session ID) is **not** the request `sessionID` (your external session reference) — in both the Core and Integration Adapter API specs and the integration docs.

## 1.7.2

- Publish the **Swipe Games Integration Skill** — an [Agent Skill](https://agentskills.io) that teaches an AI coding agent the whole integration (Core API + the four signed reverse calls), covering the official Node, Go, and PHP SDKs plus working directly against the HTTP API for any other language. Install with `npx skills add swipegames/public-api`.
- **Correction:** Integration Adapter `amount`/`balance` fields are **decimal strings in the currency's main unit** (e.g. `"0.90"` = €0.90), **not** the smallest unit. The OpenAPI spec was always correct; this fixes the AI-integration guidance (skill + prompts) that previously described them as smallest-unit (`"1000"`). If you integrated against the old wording, re-check your money handling.
- Rename the [Integration Tools](/tools) page (formerly "Integration SDKs", at `/sdks`) and reframe it so the Integration Skill is the recommended path, alongside the official SDKs and per-language AI prompts (now including a "No SDK / other language" prompt). No API changes.

## 1.7.1

- no changes

## 1.7.0

- Add optional `horizontal_337x181` image (337:181 aspect) to `GameInfoImages` in the [Get Games](/core/get-games-information) response (Core API). Backward compatible — the field is optional.

## 1.6.2

- Remove hardcoded game ID table from the Games page. Available games are configured per integration — use the [Get Games](/core/get-games-information) API endpoint to retrieve the list for your specific integration.

## 1.6.1

- Fix game name typo in the games list: `Tripple Nipple` → `Triple Nipple`.

## 1.6.0

- Add optional `excludeBetLines` query parameter to `GET /games` (Core API). When set to `true`, the `betLines` field is omitted from each game in the response, significantly reducing payload size for clients that don't need free-rounds bet-lines data.

## 1.5.1

- Document `gzip` response compression support on `GET /games` (Core API). The endpoint accepts an optional `Accept-Encoding: gzip` header — strongly recommended because the response can exceed 1 MB and the request may take 10–20 seconds. No API behavior changes; documentation only.

## 1.5.0

- Add optional `roundID` field to `RefundRequest` in the Integration Adapter API. This field identifies the game round associated with the refund and is optional for backward compatibility.
- Clarify `txID` uniqueness guarantees across all Integration Adapter API endpoints (bet, win, refund). `txID` is a UUID v4 with a 3-month rolling uniqueness window; use composite key (`txID` + `roundID`) for longer guarantees.
- Remove BETA label from documentation. Add support contact email to the navigation header.

## 1.4.0

- Add new game to the games list: `Chicken Fryer`.

## 1.3.1

- no changes

## 1.3.0

- Add new games to the games list: `Catch Ahegao`, `Tuna Bomber`, `Swipe Football`.

## 1.2.26

- Remove the following languages from API snippets: Swift, Kotlin, Dart, Objective-C, C, OCaml, and R.

## 1.2.25

- no changes

## 1.2.24

- no changes

## 1.2.23

- no changes

## 1.2.22

- no changes

## 1.2.21

- no changes

## 1.2.20

- no changes

## 1.2.19

- Add [Integration SDKs](https://swipegames.github.io/public-api/sdks) page to the documentation.

## 1.2.18

- no changes

## 1.2.17

- Update the "Refund" section in [Swipe Games Public Integration Adapter API page](https://swipegames.github.io/public-api/swipegames-integration#refund). The documentation clarify that when sending a 200 OK response to a `/refund` request, this should always have a valid body.

## 1.2.16

- no changes

## 1.2.15

- Add new game `Triple Nipple` to the games list.

## 1.2.14

- no changes

## 1.2.13

- no changes

## 1.2.12

- no changes

## 1.2.11

- Update regEx pattern for the `amount` field in `BetRequest` to allow decimals.

## 1.2.10

- no changes

## 1.2.9

- no changes

## 1.2.8

- Add documentation about 30-day limit for finite free rounds campaigns. Free rounds with a `validUntil` date must not exceed 30 days. Infinite free rounds (no `validUntil`) are still supported.

## 1.2.7

- no changes

## 1.2.6

- no changes

## 1.2.5

- no changes

## 1.2.4

- no changes

## 1.2.3

- no changes

## 1.2.2

- no changes

## 1.2.1

- Add sequence diagrams to "Swipe Games Public Integration Adapter API" page (/swipegames-integration)

## 1.2.0

- Added optional `initDemoBalance` field to `/create-new-game` request. Allows setting initial demo balance for demo mode games. Default is 10 000 USD equivalent.

## 1.1.2

- Added more information about free rounds processing.8

## 1.1.1

- Made `returnUrl` parameter optional in `/create-new-game`. The field is only used when games are launched via redirect (no iframe), so it should not always be required.

## 1.1.0

- Added new `GET /games` method to retrieve games list with related information (including game images).

## 1.0.1

- Added optional error code for core error responses.
  It allows game clients to programmatically handle specific error scenarios.

## 1.0.0

- Initial release of the Swipe Games Public API documentation.

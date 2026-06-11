---
id: changes-log
title: Changes Log
slug: /changes-log
---

# Changes Log

## 1.7.1

- Publish the **Swipe Games Integration Skill** — an [Agent Skill](https://agentskills.io) that teaches an AI coding agent the whole integration (Core API + the four signed reverse calls), covering the official Node, Go, and PHP SDKs plus working directly against the HTTP API for any other language. Install with `npx skills add swipegames/public-api`.
- **Correction:** Integration Adapter `amount`/`balance` fields are **decimal strings in the currency's main unit** (e.g. `"0.90"` = €0.90), **not** the smallest unit. The OpenAPI spec was always correct; this fixes the AI-integration guidance (skill + prompts) that previously described them as smallest-unit (`"1000"`). If you integrated against the old wording, re-check your money handling.
- Rename the [Integration Tools](/tools) page (formerly "Integration SDKs", at `/sdks`) and reframe it so the Integration Skill is the recommended path, alongside the official SDKs and per-language AI prompts (now including a "No SDK / other language" prompt). No API changes.

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

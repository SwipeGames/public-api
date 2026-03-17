---
id: changes-log
title: Changes Log
slug: /changes-log
---

# Changes Log

## 1.2.17

- Update the "Refund" secion in [Swipe Games Public Integration Adapter API page](https://swipegames.github.io/public-api/swipegames-integration#refund). The documentation clarify that when sending a 200 OK response to a `/refund` request, this should always have a valid body.

## 1.2.15

- Add new game `Tripple Nipple` to the games list.

## 1.2.11

- Update regEx pattern for the `amount` field in `BetRequest` to allow decimals.

## 1.2.8

- Add documentation about 30-day limit for finite free rounds campaigns. Free rounds with a `validUntil` date must not exceed 30 days. Infinite free rounds (no `validUntil`) are still supported.

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
